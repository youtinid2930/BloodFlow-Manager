import { Test, TestingModule } from '@nestjs/testing';
<<<<<<< Updated upstream
import { DonationsController } from './donations.controller';
import { DonationsService } from './donations.service';

describe('DonationsController', () => {
=======
import { MongooseModule } from '@nestjs/mongoose';
import { DonationsController } from './donations.controller';
import { DonationService } from './donations.service';
import { Donation, DonationSchema } from './schemas/donations.schema';

import * as dotenv from 'dotenv';

dotenv.config();

jest.setTimeout(20000);

describe('DonationController', () => {
>>>>>>> Stashed changes
  let controller: DonationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
<<<<<<< Updated upstream
      controllers: [DonationsController],
      providers: [DonationsService],
=======
      imports: [
        MongooseModule.forRoot(process.env.MONGO_URI!), 
        MongooseModule.forFeature([{ name: Donation.name, schema: DonationSchema }]),
      ],
      controllers: [DonationsController],
      providers: [DonationService],
>>>>>>> Stashed changes
    }).compile();

    controller = module.get<DonationsController>(DonationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
