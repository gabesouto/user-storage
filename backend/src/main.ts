import { NestFactory } from '@nestjs/core'
import { AppModule } from './main.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const API_PORT = process.env.API_PORT || 3000
  const options = new DocumentBuilder()
    .setTitle('User Storage')
    .setDescription('User storage system by Meu Guru')
    .setVersion('1.0')
    .addServer('http://localhost:3000/', 'Local environment')
    .addTag('Staff')
    .addTag('Auth')
    .addTag('Users')
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api', app, document)
  app.enableShutdownHooks()

  await app.listen(API_PORT)
}

bootstrap()
