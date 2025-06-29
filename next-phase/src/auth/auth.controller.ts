import { Controller, Post, Body, UnauthorizedException, UseGuards, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { VerifyOtpDto } from 'src/employee/dto/verify-otp.dto';
import { UsersService } from 'src/users/users.service';
import { OtpService } from './otp.service';
import { BlacklistService } from './blacklist.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly otpService: OtpService,
    private readonly blacklistService: BlacklistService,
  ) {}

  @Post('signup')
  async signup(@Body() dto: SignupDto) {
    return this.authService.signup(dto);
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
  @Post('verify-otp')
async verifyOtp(@Body() dto: VerifyOtpDto) {
  const user = await this.usersService.findByEmail(dto.email);

  if (!this.otpService.verifyOtp(dto.email, dto.otp)) {
    throw new UnauthorizedException('Invalid OTP');
  }

  this.otpService.clearOtp(dto.email);
  return { message: 'OTP verified. Proceed to change password.' };
}

@Post('logout')
@UseGuards(JwtAuthGuard)
async logout(@Req() req: any) {
  const token = req.headers['authorization'];
  if (!token) {
    throw new UnauthorizedException('Token is missing.');
  }

  const bearerToken = token.split(' ')[1]; // Extract the token part
  this.blacklistService.add(bearerToken); // Add the token to the blacklist
  return { message: 'Logged out successfully' };
}

}
