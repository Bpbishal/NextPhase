import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
  } from 'typeorm';
  import { User } from 'src/users/user.entity';
  
  export enum LeaveType {
    SICK = 'SICK',
    VACATION = 'VACATION',
    EMERGENCY = 'EMERGENCY',
  }
  
  export enum LeaveStatus {
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED',
  }
  
  @Entity()
  export class LeaveRequest {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'enum', enum: LeaveType })
    type: LeaveType;
  
    @Column()
    fromDate: Date;
  
    @Column()
    toDate: Date;
  
    @Column({ type: 'enum', enum: LeaveStatus, default: LeaveStatus.PENDING })
    status: LeaveStatus;
  
    @ManyToOne(() => User, user => user.leaveRequests, { onDelete: 'CASCADE' })
    user: User;
  
    @CreateDateColumn()
    requestedAt: Date;
  }
  