import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DonationsService } from './donations.service';
import { DonationsController } from './donations.controller';
import { Donation, DonationSchema } from './schemas/donations.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Donation.name, schema: DonationSchema }])],
  controllers: [DonationsController],
  providers: [DonationsService],
})
export class DonationsModule {}

