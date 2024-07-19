import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { sendOtpDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sendOtp')
  sendOtp(@Body() sendOtpDto:sendOtpDto){
   return this.authService.sendOtp(sendOtpDto)
  }
  @Post('/checkOtp')
  checkOtp(){}
}
