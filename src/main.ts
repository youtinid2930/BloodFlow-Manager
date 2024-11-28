import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable global validation for all incoming requests
  app.useGlobalPipes(new ValidationPipe({
    transform: true,         // Automatically transform payloads to DTO instances
    whitelist: true,         // Strips properties that do not have any validation decorators
    forbidNonWhitelisted: true, // Throws an error if non-whitelisted properties are found
    disableErrorMessages: false, // Enables detailed error messages
  }));

  await app.listen(3000);
}
bootstrap();
