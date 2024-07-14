import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { configoreiton } from "src/config/config";


@Module({
  imports:[
    ConfigModule.forRoot({
      load:configoreiton,
      isGlobal:true
    })
  ]
})

export class customConfigModules{}