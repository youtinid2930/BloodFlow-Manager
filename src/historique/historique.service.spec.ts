import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { HistoriqueService } from './historique.service';
import { Historique, HistoriqueSchema } from './schemas/historique.schema';
import mongoose from 'mongoose';
import { Types } from 'mongoose';

describe('BloodStockService (Integration)', () => {
  let service: HistoriqueService;
  

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
        MongooseModule.forFeature([{ name: Historique.name, schema: HistoriqueSchema }]), // Register the BloodStock schema
      ],
      providers: [HistoriqueService], // Make sure the service is provided
    }).compile();

    service = module.get<HistoriqueService>(HistoriqueService); // Get the BloodStockService instance
  });

  it('create a historique', async () => {
    const createDto = {
      type: 'donation',
      related_ids: ['645a6c5e87a3a3e1f3d8b122', '645a6c5e87a3a3e1f3d8b121'],
      details: 'Donor John Doe donated 500ml of A+ blood at Hospital A.',
    };
    const result = await service.create(createDto);
    expect(result).toHaveProperty('_id');
    expect(result.type).toBe(createDto.type);
  });

  it('retrieve all historique', async () => {
    const createDto1 = {
      type: 'donation',
      related_ids: ['645a6c5e87a3a3e1f3d8b122', '645a6c5e87a3a3e1f3d8b121'],
      details: 'Donor John Doe donated 500ml of A+ blood at Hospital A.',
    };
    const createDto2 = {
      type: 'donation',
      related_ids: ['645a6c5e87a3a3e1f3d8787', '645a6c5e87a3a3e1f3djj909'],
      details: 'Donor John Doe donated 500ml of A+ blood at Hospital B.',
    };

    await service.create(createDto1);
    await service.create(createDto2);

    const result = await service.findAll();
    expect(result.length).toBe(2);
    expect(result[0]).toHaveProperty('details', 'Donor John Doe donated 500ml of A+ blood at Hospital A.');
    expect(result[1]).toHaveProperty('details', 'Donor John Doe donated 500ml of A+ blood at Hospital B.');
  });

  it('update a historique', async () => {
    const createDto = {
      type: 'donation',
      related_ids: ['645a6c5e87a3a3e1f3d8b122', '645a6c5e87a3a3e1f3d8b121'],
      details: 'Donor John Doe donated 500ml of A+ blood at Hospital A.',
    };
    const created = await service.create(createDto);

    const updateDto = {
      details: 'Donor John Doe donated 500ml of B- blood at Hospital A.',
    };

    const updated = await service.update(created._id, updateDto);
    expect(updated.details).toBe(
      updateDto.details
    );
  });

  it('delete a historique', async () => {
    const createDto = {
      type: 'donation',
      related_ids: ['645a6c5e87a3a3e1f3d8b122', '645a6c5e87a3a3e1f3d8b121'],
      details: 'Donor John Doe donated 500ml of A+ blood at Hospital A.',
    };
    const created = await service.create(createDto);

    const result = await service.remove(created._id);
    expect(result).toBeDefined();

    const allEntries = await service.findAll();
    expect(allEntries.length).toBe(0);
  });
});
