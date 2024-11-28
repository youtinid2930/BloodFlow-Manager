import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { BloodStockService } from './blood_stock.service';
import { BloodStock, BloodStockSchema } from './schemas/blood_stock.schema';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';


describe('BloodStockService (Integration)', () => {
  let service: BloodStockService;
  let mongoServer: MongoMemoryServer;

  // Set up MongoDB connection before any tests run
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/BloodFlow');

    // Check if the connection is established and db is accessible
    if (!mongoose.connection.db) {
      throw new Error('Database connection not established');
    }
  });

  // Close the database connection after all tests run
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
        MongooseModule.forRoot('mongodb://localhost:27017/BloodFlow'), // Ensure correct DB connection
        MongooseModule.forFeature([{ name: BloodStock.name, schema: BloodStockSchema }]), // Register the BloodStock schema
      ],
      providers: [BloodStockService], // Make sure the service is provided
    }).compile();

    service = module.get<BloodStockService>(BloodStockService); // Get the BloodStockService instance
  });

  it('should create a blood stock entry', async () => {
    const createDto = {
      blood_type: 'A+',
      quantity: 500,
      storage_location: 'Room 101',
      expiry_date: new Date('2024-12-01'),
      last_update: new Date('2024-10-01'),
    };
    const result = await service.create(createDto);
    expect(result).toHaveProperty('_id');
    expect(result.blood_type).toBe(createDto.blood_type);
  });

  it('should retrieve all blood stock entries', async () => {
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

  it('should update a blood stock entry', async () => {
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

  it('should delete a blood stock entry', async () => {
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

    const allEntries = await service.findAll();
    expect(allEntries.length).toBe(0);
  });
});
