import { Test, TestingModule } from '@nestjs/testing';
import * as dotenv from 'dotenv';
import { MongooseModule } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { UsersService } from './users.service';
import { User, UserSchema } from './schemas/users.schema';
import { DonorsService } from '../donors/donors.service';
import { Donor, DonorSchema } from '../donors/schemas/donor.schema';

dotenv.config();

jest.setTimeout(100000);

describe('UsersService (Integration)', () => {
  let service: UsersService;
  let donorService: DonorsService;

  // Set up MongoDB connection before any tests run
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI!);

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
        MongooseModule.forRoot(process.env.MONGO_URI!), // Ensure correct DB connection
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema },
          { name: Donor.name, schema: DonorSchema },
        ]), // Register the BloodStock schema
      ],
      providers: [UsersService, DonorsService], // Make sure the service is provided
    }).compile();

    service = module.get<UsersService>(UsersService); // Get the BloodStockService instance
    donorService = module.get<DonorsService>(DonorsService); // Get the BloodStockServices instance
    // donor

    
  });

  it('Create a User', async () => {
    // to create a user, in the first time we will set the email and the password, and we will add it also as a donor
    // because every user in our application is a possible donor, so we will create just the id, and all the other information 
    // of donor will be set later.
    // in the order the donor will be created firstly, but with only the id, the required information will be set to null or ""
    // remember that this only with the user, and we can update it later, but for other donors the information required should not
    // be null or vide.
    const donor1 = {
      name: 'Test Donor1',
      blood_type: 'A+',
      contact_info: '07848737633',
      date_naiss: new Date('1990-01-01'),
      last_donation_date: new Date('2024-01-01'),
    };

    const createdto = {
      email: 'med@gmail.com',
      password: 'securepassword',
    };

    const result = await service.create(createdto, donor1);
    // Assertions
    expect(result).toBeDefined();
    expect(result.email).toEqual('med@gmail.com');
    expect(service).toBeDefined();
  });
  it('find All users', async () => {
    const donor2 = {
      name: 'Test Donor2',
      blood_type: 'A-',
      contact_info: '9348399398',
      date_naiss: new Date('1990-02-02'),
      last_donation_date: new Date('2024-02-02'),
    };

    const donor1 = {
      name: 'Test Donor1',
      blood_type: 'A+',
      contact_info: '07848737633',
      date_naiss: new Date('1990-01-01'),
      last_donation_date: new Date('2024-01-01'),
    };

    const createdto1 = {
      email: 'med@gmail.com',
      password: 'securepassword',
    };

    const createdto2 = {
      email: 'moh@gmail.com',
      password: 'securepasssjj',
    };


    await service.create(createdto1, donor1);
    await service.create(createdto2, donor2);
    
    const result = await service.findAll();

    expect(result.length).toBe(2);
    expect(result[0].email).toBe('med@gmail.com');
    expect(result[1].email).toBe('moh@gmail.com');
  })

  it('Find user by ID', async () => {
    const donor1 = {
      name: 'Test Donor1',
      blood_type: 'A+',
      contact_info: '07848737633',
      date_naiss: new Date('1990-01-01'),
      last_donation_date: new Date('2024-01-01'),
    };

    const createdto = {
      email: 'moh@gmail.com',
      password: 'password123',
    };

    const createdUser = await service.create(createdto, donor1);
    const userId = createdUser._id;

    const result = await service.findOne(userId);
    expect(result).toBeDefined();
    expect(result?.email).toBe('moh@gmail.com');
  });

  it('Update a User', async () => {

    const donor1 = {
      name: 'Test Donor1',
      blood_type: 'A+',
      contact_info: '07848737633',
      date_naiss: new Date('1990-01-01'),
      last_donation_date: new Date('2024-01-01'),
    };

    const createdto = {
      email: 'med@gmail.com',
      password: 'securepassword',
    };

    const createdUser = await service.create(createdto, donor1);
    const userId = createdUser._id;

    const updateUserDto = {
      email: 'youssef@gmail.com',
      password: 'newsecurepassword',
    };

    const updatedUser = await service.update(userId, updateUserDto);

    expect(updatedUser).toBeDefined();
    expect(updatedUser?.email).toBe('youssef@gmail.com');
  });

  it('Remove a User', async () => {
    const donor1 = {
      name: 'Test Donor1',
      blood_type: 'A+',
      contact_info: '07848737633',
      date_naiss: new Date('1990-01-01'),
      last_donation_date: new Date('2024-01-01'),
    };

    const createdto = {
      email: 'med@gmail.com',
      password: 'password456',
    };

    const createdUser = await service.create(createdto, donor1);
    const userId = createdUser._id;

    await service.remove(userId);

    const deletedUser = await service.findOne(userId);

    expect(deletedUser).toBeNull();
  });
});
