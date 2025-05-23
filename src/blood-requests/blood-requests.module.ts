import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BloodRequest, BloodRequestSchema } from './schemas/blood-requests.schema';
import { BloodRequestService } from './blood-requests.service';
import { BloodRequestController } from './blood-requests.controller';
import { BloodStockService } from '../blood_stock/blood_stock.service';
import { EmailModule } from '../mail/mail.module'; 
import { BloodStockModule } from '../blood_stock/blood_stock.module';
import { DonorsModule } from 'src/donors/donors.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: BloodRequest.name, schema: BloodRequestSchema }]),
    BloodStockModule, // Import BloodStockModule to access the BloodStockService
    EmailModule,
    DonorsModule
  ],
  controllers: [BloodRequestController],
  providers: [BloodRequestService, BloodStockService],
  exports: [BloodRequestService, MongooseModule],
})
export class BloodRequestModule {}
