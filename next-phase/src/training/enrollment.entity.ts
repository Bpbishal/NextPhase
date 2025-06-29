import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Employee } from '../employee/employee.entity';
import { Training } from './training.entity';

@Entity()
export class Enrollment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Employee, employee => employee.enrollments)
  employee: Employee;

  @ManyToOne(() => Training, training => training.enrollments)
  training: Training;

  @Column({ default: 'ONGOING' })
  status: 'ONGOING' | 'COMPLETED';

  @Column({ default: false })
  certificateRequested: boolean;
}
