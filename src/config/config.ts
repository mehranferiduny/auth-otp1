import { registerAs } from "@nestjs/config";

export enum ConfgKeys{
  App='App',
  Db='Db',
  Jwt="Jwt"
}


const AppConfig= registerAs(ConfgKeys.App,()=>({
  port:3000
}))
const JwtConfig= registerAs(ConfgKeys.Jwt,()=>({
  acsessTokenSecret:"dc479bb02d0b63803793a2114d8ffcaa188cd787",
  refreshTokenSecret:"0f4d1684aec62727d350386415e0f3f35849690a",
}))
const DbConfig= registerAs(ConfgKeys.Db,()=>({
  port:5432,
  host:"localhost",
  username:"postgres",
  password:'root',
  database:'auth-otp'
}))

export const configoreiton=[AppConfig,DbConfig,JwtConfig]