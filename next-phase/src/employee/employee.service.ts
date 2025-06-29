import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';
import { Employee } from './employee.entity';
import { User } from '../users/user.entity';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { OtpService } from 'src/auth/otp.service';
import * as bcrypt from 'bcrypt';


@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepo: Repository<Employee>,

    @InjectRepository(User)
    private userRepo: Repository<User>,
    
    private readonly otpService: OtpService,
  ) {}

  async findByUser(user: any): Promise<Employee | null> {
    return this.employeeRepo.findOne({
      where: { user: { id: user.userId || user.id } },
      relations: ['user'],
    });
  }
  
 

  async findAllExcept(user: User): Promise<Employee[]> {
    return this.employeeRepo.find({
      where: { user: { id: Not(user.id) } },
      relations: ['user'],
    });
  }

  async updateProfile(user: User, dto: UpdateEmployeeDto) {
    const profile = await this.findByUser(user);
    if (!profile) throw new NotFoundException('Employee profile not found');

    Object.assign(profile, dto);
    return this.employeeRepo.save(profile);
  }
  async createDefaultProfile(user: User): Promise<Employee> {
    const employee = this.employeeRepo.create({
      user: user,
      department: 'Not set',
      salary: 0,
    });
    return this.employeeRepo.save(employee);
  }
  
  // async updateProfile(userId: number, dto: UpdateProfileDto) {
  //   const user = await this.usersRepo.findOneBy({ id: userId });
  
  //   if (!user) throw new NotFoundException('User not found');
  
  //   if (dto.name) user.name = dto.name;
  //   if (dto.phone) user.phone = dto.phone;
  
  //   await this.usersRepo.save(user);
  
  //   const employee = await this.employeeRepo.findOneBy({ user: { id: userId } });
  //   if (dto.department) employee.department = dto.department;
  //   if (dto.salary) employee.salary = dto.salary;
  
  //   await this.employeeRepo.save(employee);
  
  //   return { message: 'Profile updated' };
  // }
  
  // async updatePassword(email: string, newPassword: string) {
  //   const user = await this.usersRepo.findOneBy({ email });
  //   if (!user) throw new NotFoundException('User not found');
  
  //   user.password = await bcrypt.hash(newPassword, 10);
  //   await this.usersRepo.save(user);
  
  //   return { message: 'Password updated successfully' };
  // }
  async updatePasswordWithOtp(email: string, newPassword: string, otp: string) {
    const isValid = this.otpService.verifyOtp(email, otp);
    if (!isValid) throw new UnauthorizedException('Invalid OTP');
  
    const user = await this.userRepo.findOne({ where: { email } });
    if (!user) throw new NotFoundException('User not found');
  
    user.password = await bcrypt.hash(newPassword, 10);
    await this.userRepo.save(user);
    this.otpService.clearOtp(email);
  
    return { message: 'Password updated successfully' };
  }
async findByUserId(userId: number): Promise<Employee> {
  const employee = await this.employeeRepo.findOne({
    where: { user: { id: userId } },
    relations: ['user'],
  });
  if (!employee) {
    throw new NotFoundException('Employee not found');
  }
  return employee;
}


  
}
