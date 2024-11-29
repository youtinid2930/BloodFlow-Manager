import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { DonationService } from './donations.service';
import { Donation, DonationSchema } from './schemas/donations.schema';
import { Types } from 'mongoose';
import mongoose from 'mongoose';


describe('DonationsService', () => {
  let service: DonationService;

  
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/BloodFlow');

    // Check if the connection is established and db is accessible
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
        MongooseModule.forRoot('mongodb://localhost:27017/BloodFlow'), // Ensure correct DB connection
        MongooseModule.forFeature([{ name: Donation.name, schema: DonationSchema }]), // Register the Donation schema
      ],
      providers: [DonationService], // Make sure the service is provided
    }).compile();

    service = module.get<DonationService>(DonationService); // Get the DonationService instance
  });

  it('create donation', async () => {
    const createDto = {
      donor_id : new Types.ObjectId(),
      donation_date: new Date('2024-12-01'),
      blood_type: 'A+',
      quantity: 500,
      location: "Room 101",
    };

    const resutl = await service.create(createDto);
    expect(resutl).toHaveProperty('_id');
    expect(resutl.blood_type).toBe(createDto.blood_type);
  });


  it('retrieve all donations', async () => {
    const createDto1 = {
      donor_id : new Types.ObjectId(),
      donation_date: new Date('2024-12-01'),
      blood_type: 'A+',
      quantity: 500,
      location: "Room 101",
    };

    const createDto2 = {
      donor_id : new Types.ObjectId(),
      donation_date: new Date('2024-12-01'),
      blood_type: 'O-',
      quantity: 500,
      location: "Room 102",
    };

    await service.create(createDto1);
    await service.create(createDto2);

    const result = await service.findAll();
    expect(result.length).toBe(2);
    expect(result[0]).toHaveProperty('blood_type', 'A+');
    expect(result[1]).toHaveProperty('blood_type', 'O-');
  });
  

  it('update donation', async () => {
    const createDto = {
      donor_id : new Types.ObjectId(),
      donation_date: new Date('2024-12-01'),
      blood_type: 'A+',
      quantity: 500,
      location: "Room 101",
    };
    const created = await service.create(createDto);

    const updateDto = {
      quantity: 600,
      location: 'Room 102',
    };

    const updated = await service.update(created._id, updateDto);
    expect(updated.quantity).toBe(600);
    expect(updated.location).toBe(updateDto.location);
  });


  it('delete donation', async () => {
    const createDto = {
      donor_id : new Types.ObjectId(),
      donation_date: new Date('2024-12-01'),
      blood_type: 'A+',
      quantity: 500,
      location: "Room 101",
    };

    const created = await service.create(createDto);

    const result = await service.remove(created._id);
    expect(result).toBeDefined();

    const allEntries = await service.findAll();
    expect(allEntries.length).toBe(0);
  });

});
