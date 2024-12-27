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
  
  async eligible(bloodType: string): Promise<Donor[]> {
    
    const eligibleDonors = await this.donorModel.find({blood_type: bloodType}).exec();
    const filteredDonors: Donor[] = []; 

    for (const donor of eligibleDonors) {

    const isEligible = await this.eligibility_check(donor._id); 
    if (isEligible) {
      filteredDonors.push(donor); 
    }

    };
    return eligibleDonors;

  }

  async donorsByType(): Promise<Record<string, number>> {

    try {
      const result = await this.donorModel.aggregate([
        {
          $group: {
            _id: '$blood_type', 
            count: { $sum: 1 }, 
          },
        },
      ]);
  
      const groupedDonors: Record<string, number> = {};
      result.forEach((item) => {
        groupedDonors[item._id] = item.count;
      });
  
      return groupedDonors;
    } catch (error) {
      throw new Error(`Erreur lors de la récupération des donneurs par type : ${error}`);
    }
  }
  
  async getDonorByType(type: string): Promise<Donor[]> {
    try {
      const donors = await this.donorModel.find({ blood_type: { $eq: type } }).exec();
      return donors;
    } catch (error) {
      console.error('Error fetching donors by type:', error);
      throw new Error('Unable to fetch donors by type');
    }
  }
  
  
     // async 
  
      //async notifyNeedDonors()
  
   


}

