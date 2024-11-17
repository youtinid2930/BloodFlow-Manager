import { Test, TestingModule } from '@nestjs/testing';
import { BloodStockService } from './blood_stock.service';

describe('BloodStockService', () => {
  let service: BloodStockService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BloodStockService],
    }).compile();

    service = module.get<BloodStockService>(BloodStockService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
