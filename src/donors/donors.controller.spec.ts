import { Test, TestingModule } from '@nestjs/testing';
import { DonorsController } from './donors.controller';
import { DonorsService } from './donors.service';

describe('DonorsController', () => {
  let controller: DonorsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DonorsController],
      providers: [DonorsService],
    }).compile();

    controller = module.get<DonorsController>(DonorsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
