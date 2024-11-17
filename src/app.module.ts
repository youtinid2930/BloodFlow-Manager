import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
<<<<<<< HEAD
import { DonorsModule } from './donors/donors.module';
import { RequestModule } from './requests/requests.module';
import { HistoriqueModule } from './historique/historique.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/emergency-services'),
    DonorsModule,
    RequestModule,
    HistoriqueModule,
=======
import { UserModule } from './user/user.module';
import { BloodStockModule } from './blood_stock/blood_stock.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/BloodFlow'),
    UserModule,
    BloodStockModule,
>>>>>>> acb1728... creation of Blood stock
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
