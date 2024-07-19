import { IsMobilePhone, IsString, Length } from "class-validator";

export class sendOtpDto{
  @IsMobilePhone("fa-IR",{},{message:"Mobile Number Is Invalid"})
  mobile:string
}
export class checkOtpDto{
  @IsMobilePhone("fa-IR",{},{message:"Mobile Number Is Invalid"})
  mobile:string
  @IsString()
  @Length(5,5,{message:"Inccrent Code"})
  code:string
}