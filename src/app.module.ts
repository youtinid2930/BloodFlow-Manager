import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DonorsModule } from './donors/donors.module';
import { BloodRequestModule } from './blood-requests/blood-requests.module';
import { DonationsModule } from './donations/donations.module';
import { BloodStockModule } from './blood_stock/blood_stock.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { EmailModule } from './mail/mail.module';
import * as dotenv from 'dotenv';
import { APP_GUARD } from '@nestjs/core';
import { RolesModule } from './roles/roles.module';



import jwtConfig from './auth/config/jwt.config';
import { PassportModule } from '@nestjs/passport';


dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI!),
    ConfigModule.forRoot({
      load: [jwtConfig], // Ensure the jwt configuration is loaded here
      isGlobal: true,     // Makes it available globally
    }),
    DonorsModule,
    DonationsModule,
    BloodStockModule,
    BloodRequestModule,
    AuthModule,
    UsersModule,
    EmailModule,
    RolesModule,
    PassportModule.register({session: true}),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ],
})
export class AppModule {}
