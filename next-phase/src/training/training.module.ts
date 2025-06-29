import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Training } from './training.entity';
import { Enrollment } from './enrollment.entity';
import { TrainingService } from './training.service';
import { TrainingController } from './training.controller';
import { EmployeeModule } from 'src/employee/employee.module';

@Module({
  imports: [TypeOrmModule.forFeature([Training, Enrollment]), EmployeeModule],
  providers: [TrainingService],
  controllers: [TrainingController],
})
export class TrainingModule {}
