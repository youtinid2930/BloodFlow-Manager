import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { DonationsController } from './donations.controller';
import { DonationService } from './donations.service';
import { Donation, DonationSchema } from './schemas/donations.schema';
import { Donor, DonorSchema } from '../donors/schemas/donor.schema';
import { DonorsService } from '../donors/donors.service';

import * as dotenv from 'dotenv';

dotenv.config();

jest.setTimeout(100000);


describe('DonationController', () => {
  let controller: DonationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(process.env.MONGO_URI!), 

        MongooseModule.forFeature([{ name: Donation.name, schema: DonationSchema },
          { name: Donor.name, schema: DonorSchema }
        ]),
      ],
      controllers: [DonationsController],
      providers: [DonationService,DonorsService],
    }).compile();

    controller = module.get<DonationsController>(DonationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

