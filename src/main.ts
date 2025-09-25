import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove field not in DTO
      forbidNonWhitelisted: true, // throw error if request has strange field
      transform: true, // auto convert data type
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
