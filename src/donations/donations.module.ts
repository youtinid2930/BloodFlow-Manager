import { Donor,DonorSchema } from './../donors/schemas/donor.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DonationService } from './donations.service';
import { DonationsController } from './donations.controller';
import { Donation, DonationSchema } from './schemas/donations.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Donation.name, schema: DonationSchema },
    { name: Donor.name, schema: DonorSchema },
  ])],
  controllers: [DonationsController],
  providers: [DonationService],
})
export class DonationsModule {}

