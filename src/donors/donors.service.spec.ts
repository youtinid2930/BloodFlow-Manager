<<<<<<< HEAD
import { Test, TestingModule } from '@nestjs/testing';
import { DonorsService } from './donors.service';

describe('DonorsService', () => {
  let service: DonorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DonorsService],
    }).compile();

    service = module.get<DonorsService>(DonorsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
=======
import { CreateDonorDto } from './dto/create-donor.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { DonorsService } from './donors.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Donor, DonorSchema } from './schemas/donor.schema';
import mongoose from 'mongoose';

import * as dotenv from 'dotenv';

dotenv.config();

jest.setTimeout(20000);

describe('DonorsService (Intergration)',()=>{
  // Service under test
  let service: DonorsService;


  //test database connection
  beforeAll(async()=>{
    await mongoose.connect(process.env.MONGO_URI!);
    if(!mongoose.connection.db){
      throw new Error('Database connection not established');
    }
  });

  //close db after all test
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
        MongooseModule.forFeature([{ name: Donor.name, schema: DonorSchema }]), 
      ],
      providers: [DonorsService],
    }).compile();

    service = module.get<DonorsService>(DonorsService); 
  });

  //test create
  it('ceate',async()=>{
    const createDto={
      name: 'med',
      date_naiss: new Date('2003-08-15'),
      blood_type: 'O+',
      contact_info: 'med@agd.com',
      last_donation_date: new Date('2024-08-15'), 
    }
    const result = await service.create(createDto);
    expect(result).toHaveProperty('_id');
    expect(result.name).toBe(createDto.name);

  });
  

  //findall
  it('findAll',async()=>{
    const createDto1={
      name: 'youssef',
      date_naiss: new Date('2003-09-10'),
      blood_type: 'A+',
      contact_info: 'y@tinid.com',
      last_donation_date: new Date('2024-08-15'), 
    }
    const createDto2={
      name: 'abdo',
      date_naiss: new Date('2003-10-15'),
      blood_type: 'AB+',
      contact_info: 'abd@elmou.com',
      last_donation_date: new Date('2024-08-15'), 
    }
    await service.create(createDto1);
    await service.create(createDto2);
    const result=await service.findAll();
    expect(result.length).toBe(2);
    expect(result[0]).toHaveProperty('blood_type','A+');
    expect(result[1]).toHaveProperty('blood_type','AB+');

  });

  it('update',async()=>{

    const createDto={
      name: 'med',
      date_naiss: new Date('2003-08-15'),
      blood_type: 'O+',
      contact_info: 'med@agd.com',
      last_donation_date: new Date('2024-08-15'), 
    }
    const created = await service.create(createDto)

    const updateDto={
        name: 'mohamed',
        date_naiss: new Date('2003-08-15'),
        blood_type: 'O-',
        contact_info: 'med@agdid.com',
        last_donation_date: new Date('2024-08-15'), 
       }
    
    const updated = await service.update(created._id, updateDto);
    expect(updated.name).toBe('mohamed'); //ensure update
  
  });

  it('delete',async()=>{
    const createdto={
      name: 'mohamed',
      date_naiss: new Date('2003-08-15'),
      blood_type: 'O-',
      contact_info: 'med@agdid.com',
      last_donation_date: new Date('2024-08-15'), 
     }
    const create= await service.create(createdto);
    expect(create).toHaveProperty('_id');
    const result = await service.remove(create._id);
    expect(result).toBeDefined();
    const all = await service.findAll();
    expect(all.length).toBe(0);

  });






});


>>>>>>> ffb8c53ed045b6f03afe75205f439d4039198d18
