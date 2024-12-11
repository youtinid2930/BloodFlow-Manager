import { Test, TestingModule } from '@nestjs/testing';
<<<<<<< HEAD
import { BloodStockController } from './blood_stock.controller';
import { BloodStockService } from './blood_stock.service';
=======
import { MongooseModule } from '@nestjs/mongoose';
import { BloodStockController } from './blood_stock.controller';
import { BloodStockService } from './blood_stock.service';
import { BloodStock, BloodStockSchema } from './schemas/blood_stock.schema';


import * as dotenv from 'dotenv';

dotenv.config();

jest.setTimeout(20000);
>>>>>>> ffb8c53ed045b6f03afe75205f439d4039198d18

describe('BloodStockController', () => {
  let controller: BloodStockController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
<<<<<<< HEAD
=======
      imports: [
        MongooseModule.forRoot(process.env.MONGO_URI!), 
        MongooseModule.forFeature([{ name: BloodStock.name, schema: BloodStockSchema }]),
      ],
>>>>>>> ffb8c53ed045b6f03afe75205f439d4039198d18
      controllers: [BloodStockController],
      providers: [BloodStockService],
    }).compile();

    controller = module.get<BloodStockController>(BloodStockController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
