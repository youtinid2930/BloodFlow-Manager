import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { BloodRequestController } from './blood-requests.controller';
import { BloodRequestService } from './blood-requests.service';
import { BloodRequest, BloodRequestSchema } from './schemas/blood-requests.schema';

import * as dotenv from 'dotenv';

dotenv.config();

jest.setTimeout(20000);

describe('Request Controller', () => {
  let controller: BloodRequestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(process.env.MONGO_URI!), 
        MongooseModule.forFeature([{ name: BloodRequest.name, schema: BloodRequestSchema }]),
      ],
      controllers: [BloodRequestController],
      providers: [BloodRequestService],
    }).compile();

    controller = module.get<BloodRequestController>(BloodRequestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  
});
