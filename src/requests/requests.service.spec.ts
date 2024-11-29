import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { RequestService } from './requests.service';
import { Request, RequestSchema } from './schemas/request.schema';
import { Types } from 'mongoose';
import mongoose from 'mongoose';


describe('RequestsService', () => {
  let service: RequestService;

  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/BloodFlow');

    
    if (!mongoose.connection.db) {
      throw new Error('Database connection not established');
    }
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  afterEach(async () => {
    if (mongoose.connection.readyState !== 0 && mongoose.connection.db) {
      await mongoose.connection.db.dropDatabase();
    }
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/BloodFlow'), 
        MongooseModule.forFeature([{ name: Request.name, schema: RequestSchema }]), 
      ],
      providers: [RequestService], 
    }).compile();

    service = module.get<RequestService>(RequestService); 
  });

  it('create requests', async () => {
    const createDto = {
      requester_name: "youssef",
      blood_type: "A+",
      quantity: 500,
      status: "pending",
      request_date: new Date('2024-12-01'),
      contact_info : "0684938838",
    };

    const resutl = await service.create(createDto);
    expect(resutl).toHaveProperty('_id');
    expect(resutl.blood_type).toBe(createDto.blood_type);
  });


  it('retrieve all donations', async () => {
    const createDto1 = {
      requester_name: "youssef",
      blood_type: "A+",
      quantity: 500,
      status: "pending",
      request_date: new Date('2024-12-01'),
      contact_info : "0684938838",
    };

    const createDto2 = {
      requester_name: "Ahemef",
      blood_type: "B+",
      quantity: 600,
      status: "pending",
      request_date: new Date('2024-12-01'),
      contact_info : "067438388",
    };

    await service.create(createDto1);
    await service.create(createDto2);

    const result = await service.findAll();
    expect(result.length).toBe(2);
    expect(result[0]).toHaveProperty('blood_type', 'A+');
    expect(result[1]).toHaveProperty('blood_type', 'B+');
  });


  it('update donation', async () => {
    const createDto = {
      requester_name: "youssef",
      blood_type: "A+",
      quantity: 500,
      status: "pending",
      request_date: new Date('2024-12-01'),
      contact_info : "0684938838",
    };
    const created = await service.create(createDto);

    const updateDto = {
      blood_type: "A-",
      quantity: 600,
    };

    const updated = await service.update(created._id, updateDto);
    expect(updated.quantity).toBe(600);
    expect(updated.blood_type).toBe(updateDto.blood_type);
  });


  it('delete donation', async () => {
    const createDto = {
      requester_name: "youssef",
      blood_type: "A+",
      quantity: 500,
      status: "pending",
      request_date: new Date('2024-12-01'),
      contact_info : "0684938838",
    };

    const created = await service.create(createDto);

    const result = await service.remove(created._id);
    expect(result).toBeDefined();

    const allEntries = await service.findAll();
    expect(allEntries.length).toBe(0);
  });
});
