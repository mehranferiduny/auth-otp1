import { Module } from '@nestjs/common';
import { customConfigModules } from './modules/config/config.module';


@Module({
  imports: [customConfigModules],
  controllers: [],
  providers: [],
})
export class AppModule {}
