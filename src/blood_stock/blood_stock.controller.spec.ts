import { Test, TestingModule } from '@nestjs/testing';
import { BloodStockController } from './blood_stock.controller';
import { BloodStockService } from './blood_stock.service';

describe('BloodStockController', () => {
  let controller: BloodStockController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BloodStockController],
      providers: [BloodStockService],
    }).compile();

    controller = module.get<BloodStockController>(BloodStockController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
