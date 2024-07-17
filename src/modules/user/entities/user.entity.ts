import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { OtpEntity } from "./otp.entity";

@Entity("User")
export class UserEntity {
  @PrimaryGeneratedColumn("increment")
  id:number;
  @Column()
  first_Name:string;
  @Column()
  last_Name:string;
  @Column()
  mobail:string;
  @Column()
  verifay_mobail:boolean;
  @CreateDateColumn()
  created_at:Date;
  @UpdateDateColumn()
  Updaet_at:Date;

  @Column()
  otpId:number;
  @OneToOne( ()=>OtpEntity,(otp)=>otp.user)
  @JoinColumn({name:"otpId"})
  otp:OtpEntity

}
