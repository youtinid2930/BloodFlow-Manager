import { Donor,DonorSchema } from './../donors/schemas/donor.schema';
import { DonorsService } from './../donors/donors.service';
import { CreateDonationDto } from './dto/create-donation.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose'; 
import { Donation } from './schemas/donations.schema';
import { UpdateDonationDto } from './dto/update-donation.dto';


@Injectable()
export class DonationService {
  constructor(
    @InjectModel(Donation.name) private DonationModel: Model<Donation>,
    @InjectModel(Donor.name) private donorModel: Model<Donor>,
    private readonly DonorsService: DonorsService,
  ) {}

  async create(createDonationDto: CreateDonationDto): Promise<Donation> {
    const createdDonation = new this.DonationModel(createDonationDto);
    const donor_id=createDonationDto.donor_id;
    const isEligible = await this.DonorsService.eligibility_check(donor_id);
    if(isEligible == false){
         
    }
    const savedDonation = await createdDonation.save();
    if (!savedDonation) {
      throw new Error('Failed to create blood stock');
    }

    return savedDonation;
  }

  findAll() {
    return this.DonationModel.find().exec();
  }

  findOne(id: any) {
    return this.DonationModel.findById(id).exec();
  }
  
  async update(id: any, updateDonationDto: UpdateDonationDto): Promise<Donation> {
    const updatedDonation = await this.DonationModel
      .findByIdAndUpdate(id, updateDonationDto, { new: true })
      .exec();
  
    if (!updatedDonation) {
      throw new Error(`Blood stock with ID ${id} not found`);
    }
  
    return updatedDonation;
  }
  
  async remove(id: any): Promise<Donation> {
    const removedDonation = await this.DonationModel.findByIdAndDelete(id).exec();
  
    if (!removedDonation) {
      throw new Error(`Blood stock with ID ${id} not found`);
    }
  
    return removedDonation;
  }
}
