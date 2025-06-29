import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeaveController } from './leave.controller';
import { LeaveService } from './leave.service';
import { LeaveRequest } from './leave-request.entity';
import { User } from 'src/users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LeaveRequest,User])],
  controllers: [LeaveController],
  providers: [LeaveService],
})
export class LeaveModule {}
