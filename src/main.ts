import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // use class-validator and class-transformer packages to enable validation at the DTO level
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
