import { Donor,DonorSchema } from './../donors/schemas/donor.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DonationService } from './donations.service';
import { DonationsController } from './donations.controller';
import { Donation, DonationSchema } from './schemas/donations.schema';
import { DonorsModule } from '../donors/donors.module'; 
import { BloodStockService } from '../blood_stock/blood_stock.service';
import { BloodStockModule } from '../blood_stock/blood_stock.module';
import { EmailModule } from '../mail/mail.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Donation.name, schema: DonationSchema },
    { name: Donor.name, schema: DonorSchema },
  
  ]), DonorsModule,
  BloodStockModule,
  EmailModule
],


  
  controllers: [DonationsController],
  providers: [DonationService, BloodStockService],
})
export class DonationsModule {}

