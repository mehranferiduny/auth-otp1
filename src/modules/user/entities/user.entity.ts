import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

}
