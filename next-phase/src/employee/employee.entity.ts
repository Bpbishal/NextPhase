import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Enrollment } from '../training/enrollment.entity'; // <-- Import Enrollment

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @Column()
  department: string;

  @Column('decimal')
  salary: number;

  @OneToMany(() => Enrollment, enrollment => enrollment.employee)
  enrollments: Enrollment[];  // <-- Add one-to-many relation to Enrollment
}
