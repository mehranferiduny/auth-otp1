import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { checkOtpDto, sendOtpDto } from './dto/auth.dto';
import { singUpDto } from './dto/basic.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sendOtp')
  sendOtp(@Body() sendOtpDto:sendOtpDto){
   return this.authService.sendOtp(sendOtpDto)
  }
  @Post('/checkOtp')
  checkOtp(@Body() checkOtpDto:checkOtpDto){
    return this.authService.checkOtp(checkOtpDto)
  }
  @Post('/singup')
  singup(@Body() singupDto:singUpDto){
    return this.authService.singUpUser(singupDto)
  }
}
