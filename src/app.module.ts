import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DonationsModule } from './donations/donations.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/emergency-services'),
    UserModule,
    DonationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
