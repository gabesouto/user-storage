import { NestFactory } from '@nestjs/core';
import { AppModule } from './main.module'
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  app.enableShutdownHooks();
}


bootstrap();
