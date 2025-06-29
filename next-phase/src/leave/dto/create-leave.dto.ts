import { IsEnum, IsDateString } from 'class-validator';
import { LeaveType } from '../leave-request.entity';

export class CreateLeaveDto {
  @IsEnum(LeaveType)
  type: LeaveType;

  @IsDateString()
  fromDate: string;

  @IsDateString()
  toDate: string;
}
