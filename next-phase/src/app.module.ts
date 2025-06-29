import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { EmployeeModule } from './employee/employee.module';
import { Employee } from './employee/employee.entity';
import { LeaveModule } from './leave/leave.module';
import { LeaveRequest } from './leave/leave-request.entity';
import { TrainingModule } from './training/training.module';
import { Training } from './training/training.entity';
import { Enrollment } from './training/enrollment.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'nxtphase',
      entities: [User,Employee,LeaveRequest,Training,Enrollment],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    EmployeeModule,
    LeaveModule,
    TrainingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
