import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import mongoose from 'mongoose';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../users/schemas/users.schema';
import { UsersService } from '../users/users.service';
import { DonorsService } from '../donors/donors.service';
import { Donor, DonorSchema } from '../donors/schemas/donor.schema';

describe('AuthService', () => {
  let service: AuthService;
  let userService: UsersService;

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
          MongooseModule.forFeature([{ name: User.name, schema: UserSchema }, {name: Donor.name, schema: DonorSchema}
          ]), 
        ],
        providers: [AuthService, 
          UsersService,
          DonorsService,
        ], // Make sure the service is provided
      }).compile();
  
      service = module.get<AuthService>(AuthService);
      userService = module.get<UsersService>(UsersService); 

      const user = await userService.create({
        email: "test@email.com",
        password: "mypassword123"
      }, {
        name: 'Test Donor',
        blood_type: 'A+',
        contact_info: 'test@example.com',
        date_naiss: new Date('1990-01-01'),
        last_donation_date: new Date('2024-01-01'),
      });
    });

  it('Login', async () => {
    const logindto = {
      email: "test@email.com",
      password: "mypassword123"
    };

    const result = await service.login(logindto);
    console.log(result);
    expect(service).toBeDefined();
  });

  it('Validate User', async () => {
    const email = 'test@email.com';
    const result = await service.validateUser(email);
    console.log(result);
    expect(result).toBeDefined();
  });
});
