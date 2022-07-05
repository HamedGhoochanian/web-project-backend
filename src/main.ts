import * as path from 'path';
import * as dotenv from 'dotenv';
dotenv.config({
  path: path.join(__dirname, '..', 'config', `${process.env.NODE_ENV}.env`),
});

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AuthModule } from './modules/auth/auth.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({ transform: true, forbidNonWhitelisted: true }),
  );
  const config = new DocumentBuilder()
    .setTitle('Store')
    .setDescription('Store')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  await app.listen(80);
}
bootstrap();
