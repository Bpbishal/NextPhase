import { Controller, Get, Patch, Body, UseGuards, Request, Put, Post } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { EmployeeService } from './employee.service';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { AuthGuard } from '@nestjs/passport';
import { OtpService } from 'src/auth/otp.service';
import { UsersService } from 'src/users/users.service';

@UseGuards(JwtAuthGuard)
@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService,
    private readonly otpService: OtpService,
    private readonly usersService: UsersService,
  ) {}

  @Get('me')
//@UseGuards(AuthGuard('jwt'))
async getProfile(@Request() req) {
  //console.log('Logged-in user:', req.user); 
  return this.employeeService.findByUser(req.user);
}


  @Patch('me')
  @UseGuards(JwtAuthGuard)
  async updateMyProfile(@Request() req, @Body() dto: UpdateEmployeeDto) {
    return this.employeeService.updateProfile(req.user, dto);
  }

  @Get('colleagues')
@UseGuards(AuthGuard('jwt'))
async viewOthers(@Request() req) {
  console.log('Current user:', req.user);
  const all = await this.employeeService.findAllExcept(req.user);
  //console.log('Others:', all); // <== Add this
  return all.map(emp => ({
    name: emp.user.name,
    email: emp.user.email,
    department: emp.department,
  }));
}

// @Patch('update')
// @UseGuards(AuthGuard('jwt'))
// async updateProfile(@Request() req, @Body() dto: UpdateProfileDto) {
//   const user = await this.usersService.findById(req.user.id);

//   if (dto.newPassword) {
//     await this.otpService.sendOtp(user.email);
//     return { message: 'OTP sent to your email for password change' };
//   }

//   return this.employeeService.updateProfile(user.id, dto);
// }
// @Put('update')
// @UseGuards(AuthGuard)
// async updateProfile(@Request() req, @Body() updateDto: UpdateEmployeeDto) {
//   return this.employeeService.updateProfile(req.user, updateDto);
// }
@Post('send-otp')
@UseGuards(JwtAuthGuard)
async sendOtp(@Request() req) {
  return this.otpService.sendOtp(req.user.email);
}

@Post('update-password')
@UseGuards(JwtAuthGuard)
async updatePassword(@Request() req, @Body() body: { newPassword: string, otp: string }) {
  return this.employeeService.updatePasswordWithOtp(req.user.email, body.newPassword, body.otp);
}


}
