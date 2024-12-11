import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { DonationsController } from './donations.controller';
import { DonationService } from './donations.service';
import { Donation, DonationSchema } from './schemas/donations.schema';

import * as dotenv from 'dotenv';

dotenv.config();

jest.setTimeout(20000);

describe('DonationController', () => {
  let controller: DonationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(process.env.MONGO_URI!), 
        MongooseModule.forFeature([{ name: Donation.name, schema: DonationSchema }]),
      ],
      controllers: [DonationsController],
      providers: [DonationService],
    }).compile();

    controller = module.get<DonationsController>(DonationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
