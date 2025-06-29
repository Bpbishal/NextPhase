import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Training } from './training.entity';
import { Enrollment } from './enrollment.entity';
import { Employee } from '../employee/employee.entity';

@Injectable()
export class TrainingService {
  
  constructor(
     private readonly dataSource: DataSource,
    @InjectRepository(Training)
    private trainingRepository: Repository<Training>,

    @InjectRepository(Enrollment)
    private enrollmentRepository: Repository<Enrollment>,
  ) {}

  async listTrainings(department?: string): Promise<Training[]> {
    if (department) {
      return this.trainingRepository.find({ where: { department } });
    }
    return this.trainingRepository.find();
  }

   async enroll(employee: Employee, trainingId: number): Promise<Enrollment> {
    return await this.dataSource.transaction(async (manager) => {
      // Use transaction manager for all DB ops inside transaction
      const training = await manager.findOne(Training, { where: { id: trainingId } });
      if (!training) throw new NotFoundException('Training not found');

      if (training.availableSeats <= 0) {
        throw new BadRequestException('No seats available');
      }

      const existingEnrollment = await manager.findOne(Enrollment, {
        where: {
          employee: { id: employee.id },
          training: { id: trainingId },
        },
      });

      if (existingEnrollment) {
        throw new BadRequestException('Already enrolled in this training');
      }

      // Decrease available seats first to avoid race conditions
      training.availableSeats -= 1;
      await manager.save(training);

      // Create enrollment
      const enrollment = manager.create(Enrollment, {
        employee,
        training,
        status: 'ONGOING',
        certificateRequested: false,
      });
      return await manager.save(enrollment);
    });
  }

 async getEmployeeEnrollments(employee: Employee): Promise<Enrollment[]> {
  return this.enrollmentRepository.find({
    where: { employee: { id: employee.id } },
    relations: ['training'],
  });
}


  async requestCertificate(employee: Employee, enrollmentId: number) {
  const enrollment = await this.enrollmentRepository.findOne({
    where: {
      id: enrollmentId,
      employee: { id: employee.id },
    },
  });

  if (!enrollment) {
    throw new NotFoundException('Enrollment not found or unauthorized');
  }

  if (enrollment.status !== 'COMPLETED') {
    throw new BadRequestException('You have to complete the training first');
  }

  enrollment.certificateRequested = true;
  return this.enrollmentRepository.save(enrollment);
}

}
