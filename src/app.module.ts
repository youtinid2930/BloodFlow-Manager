import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DonorsModule } from './donors/donors.module';
import { BloodRequestModule } from './blood-requests/blood-requests.module';
import { DonationsModule } from './donations/donations.module';
import { BloodStockModule } from './blood_stock/blood_stock.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/BloodFlow'),
    DonorsModule,
    DonationsModule,
    BloodStockModule,
    BloodRequestModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
