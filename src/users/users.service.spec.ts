import { Test, TestingModule } from '@nestjs/testing';
import * as dotenv from 'dotenv';
import { MongooseModule } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { HistoriqueService } from 'src/historique/historique.service';
import { Historique, HistoriqueSchema } from 'src/historique/schemas/historique.schema';

dotenv.config();

jest.setTimeout(100000);

describe('BloodStockService (Integration)', () => {
  let service: HistoriqueService;
  

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
        MongooseModule.forFeature([{ name: Historique.name, schema: HistoriqueSchema }]), // Register the BloodStock schema
      ],
      providers: [HistoriqueService], // Make sure the service is provided
    }).compile();

    service = module.get<HistoriqueService>(HistoriqueService); // Get the BloodStockService instance
  });

  it('Create a User', () => {
    // to create a user , in the first time we will set the email and the password, and we will add it also as a donor
    // because every user in our application is a possible donor, so we will create just the id, and all the other inforamation 
    // of donor will be set later.
    // in the order the donor will be created firstly, but with only the id, the required information will be set to null or ""
    // remeber that this only with the user, and we can update it later, but for other donors the information required should not
    // be null or vide.

    // Create a donor:
    
    expect(service).toBeDefined();
  });
});
