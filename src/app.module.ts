import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
<<<<<<< Updated upstream
import { DonorsModule } from './donors/donors.module';
import { RequestModule } from './requests/requests.module';
import { HistoriqueModule } from './historique/historique.module';
import { DonationsModule } from './donations/donations.module';
=======
<<<<<<< HEAD
<<<<<<< HEAD
import { UserModule } from './user/user.module';
>>>>>>> Stashed changes
import { BloodStockModule } from './blood_stock/blood_stock.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/BloodFlow'),
    DonorsModule,
    DonationsModule,
    BloodStockModule,
    RequestModule,
    HistoriqueModule,
<<<<<<< Updated upstream
=======
>>>>>>> b50879e (creation of donors, historique and requests)
=======
import { DonorsModule } from './donors/donors.module';
import { BloodRequestModule } from './blood-requests/blood-requests.module';
import { DonationsModule } from './donations/donations.module';
import { BloodStockModule } from './blood_stock/blood_stock.module';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI!),
    DonorsModule,
    DonationsModule,
    BloodStockModule,
    BloodRequestModule,
>>>>>>> ffb8c53ed045b6f03afe75205f439d4039198d18
>>>>>>> Stashed changes
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
