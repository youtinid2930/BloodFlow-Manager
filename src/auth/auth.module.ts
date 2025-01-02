import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module'; // Import UsersModule
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { GoogleSrategy } from './strategies/GoogleStrategy';
import { LocalStrategy } from './strategies/local.strategy';
import jwtConfig from './config/jwt.config';
import { ConfigModule } from '@nestjs/config';
import { JwtStartegy } from './strategies/jwt.strategy';
import refreshJwtConfig from './config/refresh-jwt.config';
import { RefreshJwtStartegy } from './strategies/refresh.strategy';

@Module({
  imports: [
    UsersModule, 
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
    ConfigModule.forFeature(refreshJwtConfig),
  ],
  controllers: [AuthController], 
  providers: [JwtAuthGuard,
     GoogleSrategy,
      AuthService,
      LocalStrategy,
      JwtStartegy,
      RefreshJwtStartegy,
    ],
})
export class AuthModule {}
