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
    console.log('Fetching all donors');
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
  }

  async eligibility_check(id : any): Promise<boolean>{
  
    const donneur =await this.donorModel.findById(id).exec();
    if (!donneur) {
      throw new Error('Donor n\'existe');
    }
    const now = new Date();
    const ldd= new Date(donneur.last_donation_date);
    const diffInMs = now.getTime() - ldd.getTime();  //in ms
    const diffday = diffInMs / (1000*60*60*24); //convert to day
     
    return diffday >= 7;
   

  }

   


}