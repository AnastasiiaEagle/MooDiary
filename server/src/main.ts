import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser()) // підключення кукі
  app.useGlobalPipes( new ValidationPipe()); // підключення валідатора

  app.enableCors({
    origin: 'http://localhost:3001', // або '*', якщо хочеш дозволити всім
    credentials: true, // якщо використовуєш кукі
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
