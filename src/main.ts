import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({whitelist:true}))
  const configServis=app.get(ConfigService)
  const PORT=configServis.get("App.port")
  await app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`)
  });
}
bootstrap();
