import * as path from 'path';
import * as dotenv from 'dotenv';
dotenv.config({
  path: path.join(__dirname, '..', 'config', `${process.env.NODE_ENV}.env`),
});

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({ transform: true, forbidNonWhitelisted: true }),
  );
  await app.listen(3000);
}
bootstrap();
