import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class OtpService {
  private otps = new Map<string, string>();

  async sendOtp(email: string) {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    this.otps.set(email, otp);

    const transporter = nodemailer.createTransport({
      // host: 'smtp.mailgun.org',
      // port: 587,
      // secure: false,
      service:'gmail',
      auth: {
        user: 'luffyxkingofpirates@gmail.com', 
        pass: 'xucy nbzc pfjr grll',
      },
    });

    await transporter.sendMail({
      from: '"NextPhase" <luffyxkingofpirates@gmail.com>', 
      to: email,
      subject: 'OTP for Password Change',
      text: `Your OTP is ${otp}`,
    });

    return { message: 'OTP sent to email' };
  }

  verifyOtp(email: string, otp: string): boolean {
    return this.otps.get(email) === otp;
  }

  clearOtp(email: string) {
    this.otps.delete(email);
  }
}
