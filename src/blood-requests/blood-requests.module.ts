import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BloodRequest, BloodRequestSchema } from './schemas/blood-requests.schema';
import { BloodRequestService } from './blood-requests.service';
import { BloodRequestController } from './blood-requests.controller';
import { BloodStockService } from '../blood_stock/blood_stock.service';
import { EmailService } from '../email/email.service';
import { BloodStockModule } from '../blood_stock/blood_stock.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: BloodRequest.name, schema: BloodRequestSchema }]),
    BloodStockModule, // Import BloodStockModule to access the BloodStockService
  ],
  controllers: [BloodRequestController],
  providers: [BloodRequestService, BloodStockService, EmailService],
  exports: [BloodRequestService, MongooseModule],
})
export class BloodRequestModule {}
