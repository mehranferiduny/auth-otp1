import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity("Otp")
export class OtpEntity {
  @PrimaryGeneratedColumn("increment")
  id:number;
  @Column()
  code:string;
  @Column()
  expires_in:Date;
  @Column()
  userId:number;
  @OneToOne( ()=>UserEntity,(user)=>user.otp,{onDelete:"CASCADE"})
  user:UserEntity

}
