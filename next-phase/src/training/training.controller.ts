import { Controller, Get, Post, Body, Query, UseGuards, Request, NotFoundException, Param } from '@nestjs/common';
import { TrainingService } from './training.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { EnrollTrainingDto } from './dto/enroll-training.dto';
import { RequestCertificateDto } from './dto/request-certificate.dto';
import { EmployeeService } from 'src/employee/employee.service';

@Controller('training')
@UseGuards(JwtAuthGuard)
export class TrainingController {
  constructor(
    private readonly trainingService: TrainingService,
    private readonly employeeService: EmployeeService,  // Inject EmployeeService
  ) {}
  @Get()
  async listTrainings(@Query('department') department?: string) {
    return this.trainingService.listTrainings(department);
  }

  // Enroll employee in a training
  @Post('enroll')
  async enroll(@Request() req, @Body() enrollDto: EnrollTrainingDto) {
    const userId = req.user.id;
    const employee = await this.employeeService.findByUserId(userId);

    if (!employee) {
      throw new NotFoundException('Employee not found for this user');
    }

    return this.trainingService.enroll(employee, enrollDto.trainingId);
  }

  // Get logged-in employee's trainings (enrollments)
 @Get('my-enrollments')
async myEnrollments(@Request() req) {
  const userId = req.user.id;

  const employee = await this.employeeService.findByUserId(userId);
  if (!employee) {
    throw new NotFoundException('Employee not found for this user');
  }

  return this.trainingService.getEmployeeEnrollments(employee);
}


  // Request certificate for completed training
  @Post('request-certificate/:id')
async requestCertificate(@Request() req, @Param('id') enrollmentId: number) {
  const userId = req.user.id;

  const employee = await this.employeeService.findByUserId(userId);
  if (!employee) {
    throw new NotFoundException('Employee not found for this user');
  }

  return this.trainingService.requestCertificate(employee, enrollmentId);
}


}
