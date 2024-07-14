import { registerAs } from "@nestjs/config";

export enum ConfgKeys{
  App='App',
  Db='Db'
}


const AppConfig= registerAs(ConfgKeys.App,()=>({
  port:3000
}))
const DbConfig= registerAs(ConfgKeys.Db,()=>({
  port:5432,
  host:"localhost",
  username:"postgres",
  password:'root',
  database:'auth-otp'
}))

export const configoreiton=[AppConfig,DbConfig]