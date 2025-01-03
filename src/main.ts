import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import session from "express-session";
import passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable global validation for all incoming requests
  app.useGlobalPipes(new ValidationPipe({
    transform: true,         // Automatically transform payloads to DTO instances
    whitelist: true,         // Strips properties that do not have any validation decorators
    forbidNonWhitelisted: true, // Throws an error if non-whitelisted properties are found
    disableErrorMessages: false, // Enables detailed error messages
  }));

  app.use(
    session ({
      secret:"hjshdjshdjshdjshdjshhgfhgshfghsfg",
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 60000,
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(3000);
}
bootstrap();