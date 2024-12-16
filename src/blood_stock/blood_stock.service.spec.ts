import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { BloodStockService } from './blood_stock.service';
import { BloodStock, BloodStockSchema } from './schemas/blood_stock.schema';
import mongoose from 'mongoose';

import * as dotenv from 'dotenv';

dotenv.config();

jest.setTimeout(100000);

describe('BloodStockService (Integration)', () => {
  let service: BloodStockService;
  
    
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

  //create a testing module before each test
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(process.env.MONGO_URI!), 
        MongooseModule.forFeature([{ name: BloodStock.name, schema: BloodStockSchema }]), 
      ],
      providers: [BloodStockService],
    }).compile();

    service = module.get<BloodStockService>(BloodStockService);
  });

  it('create', async () => {
    const createDto = {
      blood_type: 'A+',
      quantity: 500,
      storage_location: 'Room 101',
      expiry_date: new Date('2024-12-01'),
      last_update: new Date('2024-10-01'),
    };
    const result = await service.create(createDto);
    expect(result).toHaveProperty('_id');
    expect(result.blood_type).toBe("A+");
  });

  it('findAll', async () => {
    const createDto1 = {
      blood_type: 'A+',
      quantity: 500,
      storage_location: 'Room 101',
      expiry_date: new Date('2024-12-01'),
      last_update: new Date('2024-10-01'),
    };
    const createDto2 = {
      blood_type: 'O-',
      quantity: 800,
      storage_location: 'Room 102',
      expiry_date: new Date('2024-11-01'),
      last_update: new Date('2024-09-01'),
    };

    await service.create(createDto1);
    await service.create(createDto2);

    const result = await service.findAll();
    expect(result.length).toBe(2);
    expect(result[0]).toHaveProperty('blood_type', 'A+');
    expect(result[1]).toHaveProperty('blood_type', 'O-');
  });

  it('update', async () => {
    const createDto = {
      blood_type: 'A+',
      quantity: 500,
      storage_location: 'Room 101',
      expiry_date: new Date('2024-12-01'),
      last_update: new Date('2024-10-01'),
    };
    
    const created = await service.create(createDto);

    const updateDto = {
      blood_type: 'B+',
      quantity: 600,
      storage_location: 'Room 102',
      expiry_date: new Date('2024-12-15'),
      last_update: new Date('2024-10-05'),
    };

    const updated = await service.update(created._id, updateDto);
    expect(updated.quantity).toBe(600);
    expect(new Date(updated.last_update).toISOString()).toBe(
      new Date(updateDto.last_update).toISOString(),
    );
  });

  it('delete', async () => {
    const createDto = {
      blood_type: 'A+',
      quantity: 500,
      storage_location: 'Room 101',
      expiry_date: new Date('2024-12-01'),
      last_update: new Date('2024-10-01'),
    };
    const created = await service.create(createDto);

    const result = await service.remove(created._id);
    expect(result).toBeDefined();

    const all = await service.findAll();
    expect(all.length).toBe(0);
  });
});
