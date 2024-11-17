import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DonorsModule } from './donors/donors.module';
import { RequestModule } from './requests/requests.module';
import { HistoriqueModule } from './historique/historique.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/emergency-services'),
    DonorsModule,
    RequestModule,
    HistoriqueModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
