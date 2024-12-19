import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import mongoose from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../users/schemas/users.schema';

describe('AuthService', () => {
  let service: AuthService;

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
          ]), 
        ],
        providers: [AuthService], // Make sure the service is provided
      }).compile();
  
      service = module.get<AuthService>(AuthService); // Get the  instance
      
    });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
