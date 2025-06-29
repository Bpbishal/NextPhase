import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { LeaveRequest, LeaveStatus } from './leave-request.entity';
import { CreateLeaveDto } from './dto/create-leave.dto';
import { User } from 'src/users/user.entity';

@Injectable()
export class LeaveService {
  constructor(
    @InjectRepository(LeaveRequest)
    private leaveRepo: Repository<LeaveRequest>,
  ) {}

  async applyForLeave(user: User, dto: CreateLeaveDto) {
    const leave = this.leaveRepo.create({ ...dto, user });
    return this.leaveRepo.save(leave);
  }

  async getMyLeaves(user: User) {
    return this.leaveRepo.find({
      where: { user },
      order: { fromDate: 'DESC' },
    });
  }

  async deleteLeave(user: User, id: number) {
    const leave = await this.leaveRepo.findOne({ where: { id, user } });
    if (!leave || leave.status !== LeaveStatus.PENDING) {
      throw new Error('Cannot delete this leave');
    }
    return this.leaveRepo.remove(leave);
  }

  async getLeaveBalance(user: User) {
    const leaves = await this.leaveRepo.find({ where: { user } });

    const taken = leaves.filter(l => l.status === LeaveStatus.APPROVED);
    const usedDays = taken.reduce((acc, leave) => {
      const days =
        (new Date(leave.toDate).getTime() -
          new Date(leave.fromDate).getTime()) /
        (1000 * 60 * 60 * 24) +
        1;
      return acc + days;
    }, 0);

    const totalAllowed = 30;
    return {
      totalAllowed,
      used: usedDays,
      remaining: totalAllowed - usedDays,
    };
  }
}
