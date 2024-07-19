import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { OtpEntity } from '../user/entities/otp.entity';
import { sendOtpDto } from './dto/auth.dto';
import { randomInt } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepository:Repository<UserEntity>,
    @InjectRepository(OtpEntity) private readonly otpRepository:Repository<OtpEntity>
  ){}

  sendOtp=async(sendOtpDto:sendOtpDto)=>{
   const {mobile}=sendOtpDto;
  
   let user=await this.userRepository.findOneBy({mobail:mobile})
   if(!user){
     user= this.userRepository.create({
      mobail:mobile
     })
     await this.userRepository.save(user)
   }
   await this.createOtpUser(user);
  
   return{
    message:"send code is sucsesfuly",
   }
  }
  createOtpUser=async(user:UserEntity)=>{
    const code =randomInt(10000,99999).toString();
    const ExpiresIn=new Date(new Date().getTime() +1000 *60 *2);

    let otp=await this.otpRepository.findOneBy({userId:user.id})
     if(otp){
      if(otp.expires_in > new Date()){
        throw new BadRequestException("code is not expierd")
      }
      otp.code=code;
      otp.expires_in=ExpiresIn
     }else{
      otp= this.otpRepository.create({code:code,expires_in:ExpiresIn,userId:user.id})
     }
     await this.otpRepository.save(otp)
     user.otpId=otp.id
     await this.userRepository.save(user)
  }

}
