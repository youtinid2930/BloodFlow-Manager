import { Module } from '@nestjs/common';
import { DonorsService } from './donors.service';
import { DonorsController } from './donors.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Donor, DonorSchema } from './schemas/donor.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Donor.name, schema: DonorSchema }])],
  controllers: [DonorsController],
  providers: [DonorsService],
})
export class DonorsModule {}
