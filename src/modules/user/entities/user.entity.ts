import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { OtpEntity } from "./otp.entity";

@Entity("User")
export class UserEntity {
  @PrimaryGeneratedColumn("increment")
  id:number;
  @Column({nullable:true})
  first_Name:string;
  @Column({nullable:true})
  last_Name:string;
  @Column({nullable:true})
  email:string;
  @Column({nullable:true})
  password:string;
  @Column({nullable:true})
  mobail:string;
  @Column({default:false})
  verifay_mobail:boolean;
  @CreateDateColumn()
  created_at:Date;
  @UpdateDateColumn()
  Updaet_at:Date;

  @Column({nullable:true})
  otpId:number;
  @OneToOne( ()=>OtpEntity,(otp)=>otp.user)
  @JoinColumn({name:"otpId"})
  otp:OtpEntity

}
