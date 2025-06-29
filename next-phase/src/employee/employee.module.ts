import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './employee.entity';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { UsersModule } from '../users/users.module';
import { User } from 'src/users/user.entity';
import { OtpModule } from 'src/auth/otp.module';

@Module({
  imports: [TypeOrmModule.forFeature([Employee,User]), UsersModule,OtpModule],
  providers: [EmployeeService],
  controllers: [EmployeeController],
  exports: [EmployeeService],
})
export class EmployeeModule {}
