import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateEmployeeDto {
  @IsOptional()
  @IsString()
  department?: string;

//   @IsOptional()
//   @IsString()
//   skills?: string;

  @IsOptional()
  @IsNumber()
  salary?: number;
}
