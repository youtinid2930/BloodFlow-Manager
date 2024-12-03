
import { Test, TestingModule } from '@nestjs/testing';
import { DonorsController } from './donors.controller';
import { DonorsService } from './donors.service';
import { MongooseModule } from '@nestjs/mongoose';
import {Donor,DonorSchema} from './schemas/donor.schema'

describe('DonorsController', () => {
  let controller: DonorsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/BloodFlow'), 
        MongooseModule.forFeature([{ name: Donor.name, schema: DonorSchema }]),
      ],
      controllers: [DonorsController],
      providers: [DonorsService],
    }).compile();

    controller = module.get<DonorsController>(DonorsController);
  });
  

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
