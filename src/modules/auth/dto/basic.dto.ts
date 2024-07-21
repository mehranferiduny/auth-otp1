import { IsEmail, IsMobilePhone, IsString, Length } from "class-validator";

export class singUpDto {
  @IsString()
  @Length(2,12,{message:"name shuled in 2_12 chaercher"})
  first_name: string;
  @IsString()
  @Length(2,12,{message:"last_name shuled in 2_12 chaercher"})
  last_name: string;
  @IsMobilePhone("fa-IR", {}, { message: "phone number is incarennt" })
  mobail: string;
  @IsString()
  @IsEmail({}, { message: "email format is incarennt" })
  email: string;
  @IsString()
  @Length(6, 20, {
    message: "you password min 6 charecter and max 20 chaercter",
  })
  password: string;
  @IsString()
  confirm_password: string;
}

export class logInDto {
  @IsString()
  @IsEmail({}, { message: "email format is incarennt" })
  email: string;
  @IsString()
  @Length(6, 20, {
    message: "you password min 6 charecter and max 20 chaercter",
  })
  password: string;
}
