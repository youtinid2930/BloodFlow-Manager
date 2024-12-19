import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { DonationService } from './donations.service';
import { Donation, DonationSchema } from './schemas/donations.schema';
import { Types } from 'mongoose';
import mongoose from 'mongoose';
import { DonorsService } from '../donors/donors.service';
import { Donor, DonorSchema } from '../donors/schemas/donor.schema';

import * as dotenv from 'dotenv';

dotenv.config();

jest.setTimeout(100000);


describe('DonationsService', () => {
  let service: DonationService;
  let donorService: DonorsService; 
  let donorId: Types.ObjectId;

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
        MongooseModule.forFeature([
          { name: Donation.name, schema: DonationSchema },
          { name: Donor.name, schema: DonorSchema },
        ]),

      ],
      providers: [DonationService, DonorsService],
    }).compile();

    service = module.get<DonationService>(DonationService);
    donorService = module.get<DonorsService>(DonorsService);

    // Create a donor to be used in tests
    const donor = await donorService.create({
      name: 'Test Donor',
      blood_type: 'A+',
      contact_info: 'test@example.com',
      date_naiss: new Date('1990-01-01'),
      last_donation_date: new Date('2024-01-01'),
    });

    donorId = donor._id as Types.ObjectId;  //cast 
  });

  it('create donation', async () => {
    const createDto = {
      donor_id: donorId, // Use the created donor's ID
      donation_date: new Date('2024-12-01'),
      blood_type: 'A+',
      quantity: 500,
      location: 'Room 101',
    };

    const result = await service.create(createDto);
    expect(result).toHaveProperty('_id');
    expect(result.blood_type).toBe(createDto.blood_type);
  });

  it('retrieve all donations', async () => {
    const createDto1 = {
      donor_id: donorId, // Use the created donor's ID
      donation_date: new Date('2024-12-01'),
      blood_type: 'A+',
      quantity: 500,
      location: 'Room 101',
    };

    const createDto2 = {
      donor_id: donorId, // Use the created donor's ID
      donation_date: new Date('2024-12-01'),
      blood_type: 'O-',
      quantity: 500,
      location: 'Room 102',
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
      donor_id: donorId, // Use the created donor's ID
      donation_date: new Date('2024-12-01'),
      blood_type: 'A+',
      quantity: 500,
      location: 'Room 101',
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
      donor_id: donorId, // Use the created donor's ID
      donation_date: new Date('2024-12-01'),
      blood_type: 'A+',
      quantity: 500,
      location: 'Room 101',
    };

    const created = await service.create(createDto);

    const result = await service.remove(created._id);
    expect(result).toBeDefined();

    const allEntries = await service.findAll();
    expect(allEntries.length).toBe(0);
  });
});
