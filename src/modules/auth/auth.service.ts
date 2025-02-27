import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { OtpEntity } from '../user/entities/otp.entity';
import { checkOtpDto, sendOtpDto } from './dto/auth.dto';
import { randomInt } from 'crypto';
import { TokenPailod } from './types/paylod';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { logInDto, singUpDto } from './dto/basic.dto';
import { compareSync, genSaltSync,hashSync } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepository:Repository<UserEntity>,
    @InjectRepository(OtpEntity) private readonly otpRepository:Repository<OtpEntity>,
    private jwtSirvis:JwtService,
    private configServis:ConfigService
  ){}

  async sendOtp(sendOtpDto:sendOtpDto){
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
  async checkOtp(checkOtpDto:checkOtpDto){
    const {mobile,code}=checkOtpDto
    const user=await this.userRepository.findOne({
      where:{mobail:mobile},
      relations:{
        otp:true
      }
    })
    const now=new Date();
    if(!user || !user?.otp) throw new UnauthorizedException("Not Find User Accoant")
      const otp=user?.otp;
    if(otp?.code !== code) throw new UnauthorizedException("code is inccrement");
    if(otp?.expires_in < now ) throw new UnauthorizedException(" code is expired") 
      if(!user.verifay_mobail){
        await this.userRepository.update({id:user.id},{
          verifay_mobail:true
        })
      }
      const {acssesToken,refreshToken}=this.makeTokenForUser({mobile:mobile,userId:user.id})
      return {
        acssesToken,
        refreshToken,
        message:"you logged_in sucessfuly"
      }
  }
  async createOtpUser(user:UserEntity){
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

  async singUpUser(singUpDto:singUpDto){
    const {email,first_name,last_name,mobail,password,confirm_password}=singUpDto
    await this.emailCheck(email)
    await this.mobailCheck(mobail)
    if(password !== confirm_password) throw new BadRequestException("passsword and confirmPassword sould be ecuales")
    const salt=genSaltSync(10)
    const hashedPassword=hashSync(password,salt)
    const user=this.userRepository.create({
      first_Name:first_name,
      last_Name:last_name,
      email,
      mobail:mobail,
      verifay_mobail:false,
      password:hashedPassword
     })
     await this.userRepository.save(user)
     return{
      message:"user singup sucsesfuly"
     }

      

  }
  async logInUser(loginDto:logInDto){
    const {email,password}=loginDto
    const user=await this.userRepository.findOneBy({email})
    if(!user) throw new UnauthorizedException("Username Or Password Incarent!")
    const isMach= compareSync(password,user.password)  
  if(!isMach) throw new UnauthorizedException("Username Or Password Incarent!")
    if(!user.verifay_mobail){
      await this.userRepository.update({id:user.id},{
        verifay_mobail:true
      })
    }
    const {acssesToken,refreshToken}=this.makeTokenForUser({mobile:user.mobail,userId:user.id})
    return {
      acssesToken,
      refreshToken,
      message:"you logged_in sucessfuly"
    }

  }
  makeTokenForUser(pailod:TokenPailod){
    const acssesToken= this.jwtSirvis.sign(pailod,{
      secret:this.configServis.get("Jwt.acsessTokenSecret"),
      expiresIn:"30d"
    })
    const refreshToken= this.jwtSirvis.sign(pailod,{
      secret:this.configServis.get("Jwt.refreshTokenSecret"),
      expiresIn:"1y"
    })
    return{
      acssesToken,refreshToken
    }
  }

  async validateAcsesToken(token:string){
    try {
      const paylod=this.jwtSirvis.verify<TokenPailod>(token,{
        secret:this.configServis.get("Jwt.acsessTokenSecret")
      })
      if(typeof paylod=="object" && paylod?.userId){
          const user=await this.userRepository.findOneBy({id:paylod.userId})
          if(!user) throw new UnauthorizedException("login on Accont")
            return user
      }
      throw new UnauthorizedException("login on Accont")
    } catch (error) {
      throw new UnauthorizedException("login on Accont")
    }
  }


  async emailCheck(email:string){
    const user=await this.userRepository.findOneBy({email:email})
    if(user) throw new ConflictException("email is alredy exist")
  }
  async mobailCheck(mobail:string){
    const user=await this.userRepository.findOneBy({mobail:mobail})
    if(user) throw new ConflictException("mobail number is alredy exist")
  }

}
