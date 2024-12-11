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
    // const isEligible = await this.DonorsService.eligibility_check(donor_id);
    // if (!isEligible){
    //   throw new Error('donneur not Eligible');    
    // }
    const savedDonation = await createdDonation.save();
    if (!savedDonation) {
      throw new Error('failed to create donation');
    }

    //update to last-donation in donors
    const updateDonorDto = {
      last_donation_date: createDonationDto.donation_date,
    };
    
    const updatedDonor = await this.DonorsService.update(donor_id,updateDonorDto);
    if (!updatedDonor) {
      throw new Error('failed to update donor');
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
      throw new Error('doantion with ID ${id} not found');
    }

    const donorId = updatedDonation.donor_id;

    const updateDonorDate = {
      last_donation_date: updateDonationDto.donation_date,
    };  
    const updateddate = await this.DonorsService.update(donorId,updateDonorDate);

    if(!updateddate){
      throw new Error('failed to update donor');
    }

  
    return updatedDonation;
  }
  
  async remove(id: any): Promise<Donation> {
    const removedDonation = await this.DonationModel.findByIdAndDelete(id).exec();
  
    if (!removedDonation) {
      throw new Error('doantion with ID ${id} not found');
    }
  
    return removedDonation;
  }
}
