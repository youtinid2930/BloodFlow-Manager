<<<<<<< HEAD
import { Test, TestingModule } from '@nestjs/testing';
import { DonorsController } from './donors.controller';
import { DonorsService } from './donors.service';
=======

import { Test, TestingModule } from '@nestjs/testing';
import { DonorsController } from './donors.controller';
import { DonorsService } from './donors.service';
import { MongooseModule } from '@nestjs/mongoose';
import {Donor,DonorSchema} from './schemas/donor.schema'

import * as dotenv from 'dotenv';

dotenv.config();

jest.setTimeout(20000);
>>>>>>> ffb8c53ed045b6f03afe75205f439d4039198d18

describe('DonorsController', () => {
  let controller: DonorsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
<<<<<<< HEAD
=======
      imports: [
        MongooseModule.forRoot(process.env.MONGO_URI!), 
        MongooseModule.forFeature([{ name: Donor.name, schema: DonorSchema }]),
      ],
>>>>>>> ffb8c53ed045b6f03afe75205f439d4039198d18
      controllers: [DonorsController],
      providers: [DonorsService],
    }).compile();

    controller = module.get<DonorsController>(DonorsController);
  });
<<<<<<< HEAD
=======
  
>>>>>>> ffb8c53ed045b6f03afe75205f439d4039198d18

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
