import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { RequestsController } from './requests.controller';
import { RequestService } from './requests.service';
import { Request, RequestSchema } from './schemas/request.schema';

describe('Request Controller', () => {
  let controller: RequestsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/BloodFlow'), 
        MongooseModule.forFeature([{ name: Request.name, schema: RequestSchema }]),
      ],
      controllers: [RequestsController],
      providers: [RequestService],
    }).compile();

    controller = module.get<RequestsController>(RequestsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
