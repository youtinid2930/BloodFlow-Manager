<<<<<<< Updated upstream
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DonationsService } from './donations.service';
=======
import { Donor,DonorSchema } from './../donors/schemas/donor.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DonationService } from './donations.service';
>>>>>>> Stashed changes
import { DonationsController } from './donations.controller';
import { Donation, DonationSchema } from './schemas/donations.schema';

@Module({
<<<<<<< Updated upstream
  imports: [MongooseModule.forFeature([{ name: Donation.name, schema: DonationSchema }])],
  controllers: [DonationsController],
  providers: [DonationsService],
=======
  imports: [MongooseModule.forFeature([
    { name: Donation.name, schema: DonationSchema },
    { name: Donor.name, schema: DonorSchema },
  ])],
  controllers: [DonationsController],
  providers: [DonationService],
>>>>>>> Stashed changes
})
export class DonationsModule {}

