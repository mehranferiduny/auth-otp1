import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";

@Injectable()
export class TypeOrmDbConfig implements TypeOrmOptionsFactory{
  constructor(private configServis:ConfigService){}
  createTypeOrmOptions(connectionName?: string): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    return{
      type:"postgres",
      port:this.configServis.get("Db.port"),
      host:this.configServis.get("Db.host"),
      username:this.configServis.get("Db.username"),
      password:this.configServis.get("Db.password"),
      database:this.configServis.get("Db.database"),
      synchronize:true,
      autoLoadEntities:true,
      
    }
    
  }
}