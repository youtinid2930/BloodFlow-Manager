import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { BloodRequestService } from './blood-requests.service';
import { BloodRequest, BloodRequestSchema } from './schemas/blood-requests.schema';
import mongoose from 'mongoose';


import * as dotenv from 'dotenv';

dotenv.config();

jest.setTimeout(100000);

describe('RequestsService', () => {
  let service: BloodRequestService;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI!);

    
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
        MongooseModule.forRoot(process.env.MONGO_URI!), 
        MongooseModule.forFeature([{ name: BloodRequest.name, schema: BloodRequestSchema }]), 
      ],
      providers: [BloodRequestService], 
    }).compile();

    service = module.get<BloodRequestService>(BloodRequestService); 
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


  it('retrieve all requests', async () => {
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


  it('update request', async () => {
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


  it('delete request', async () => {
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
