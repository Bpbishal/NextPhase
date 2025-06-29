import { Employee } from 'src/employee/employee.entity';
import { LeaveRequest } from 'src/leave/leave-request.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  phone: string;
  
@OneToOne(() => Employee, (employee) => employee.user)
employee: Employee;

@OneToMany(() => LeaveRequest, leave => leave.user)
leaveRequests: LeaveRequest[];
    
}
