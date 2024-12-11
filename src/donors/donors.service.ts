<<<<<<< HEAD
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDonorDto } from './dto/create-donor.dto';
import { UpdateDonorDto } from './dto/update-donor.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Donor } from './schemas/donor.schema';

@Injectable()
export class DonorsService {
  create(createDonorDto: CreateDonorDto) {
    return 'This action adds a new donor';
  }

  findAll() {
    return `This action returns all donors`;
  }

  findOne(id: number) {
    return `This action returns a #${id} donor`;
  }

  update(id: number, updateDonorDto: UpdateDonorDto) {
    return `This action updates a #${id} donor`;
  }

  remove(id: number) {
    return `This action removes a #${id} donor`;
=======
import { DonorsModule } from './donors.module';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDonorDto } from './dto/create-donor.dto';
import { UpdateDonorDto } from './dto/update-donor.dto';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Donor,DonorSchema } from './schemas/donor.schema';

@Injectable()
export class DonorsService {
  constructor(
    @InjectModel(Donor.name) private donorModel: Model<Donor>,
  ) {}
  

  // Create
  async create(createDonorDto: CreateDonorDto): Promise<Donor> {
      const newDonor = new this.donorModel(createDonorDto);
      return await newDonor.save();
    }
  
  findAll() {
    return this.donorModel.find().exec();
  }

  findOne(id: any) {
    return this.donorModel.findById(id).exec();
  }

  async update(id: any, updateDonorDto: UpdateDonorDto): Promise<Donor> {
    const donor = await this.donorModel.findById(id);

    if (!donor) {
      throw new NotFoundException('donor nexite pas');
    }
    const updateddonor = await this.donorModel.findByIdAndUpdate(id, updateDonorDto, { new: true }).exec();
    //new true: return the updateed one document
    
    if (!updateddonor) {
      throw new NotFoundException('Donor could not be updated');
    }
    
    return updateddonor;


  }

  async remove(id: any): Promise<Donor> {
    const removedDonor = await this.donorModel.findByIdAndDelete(id).exec();
  
    if (!removedDonor) {
      throw new Error('Donor nexiste');
    }
  
    return removedDonor;
>>>>>>> ffb8c53ed045b6f03afe75205f439d4039198d18
  }
}
