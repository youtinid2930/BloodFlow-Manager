import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { BloodStockController } from './blood_stock.controller';
import { BloodStockService } from './blood_stock.service';
import { BloodStock, BloodStockSchema } from './schemas/blood_stock.schema';

describe('BloodStockController', () => {
  let controller: BloodStockController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/BloodFlow'), 
        MongooseModule.forFeature([{ name: BloodStock.name, schema: BloodStockSchema }]),
      ],
      controllers: [BloodStockController],
      providers: [BloodStockService],
    }).compile();

    controller = module.get<BloodStockController>(BloodStockController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
