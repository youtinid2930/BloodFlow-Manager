import { Test, TestingModule } from '@nestjs/testing';
import { DonorsService } from './donors.service';

describe('DonorsService', () => {
  let service: DonorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DonorsService],
    }).compile();

    service = module.get<DonorsService>(DonorsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
