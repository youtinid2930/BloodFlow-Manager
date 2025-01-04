import { Donor,DonorSchema } from './../donors/schemas/donor.schema';
import { DonorsService } from './../donors/donors.service';
import { CreateDonationDto } from './dto/create-donation.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose'; 
import { Donation } from './schemas/donations.schema';
import { UpdateDonationDto } from './dto/update-donation.dto';
import { ObjectId } from 'mongodb';
import { BloodStock } from 'src/blood_stock/schemas/blood_stock.schema';
import { BloodStockService } from 'src/blood_stock/blood_stock.service';
import { Schema } from 'inspector/promises';



@Injectable()
export class DonationService {
  constructor(
    @InjectModel(Donation.name) private DonationModel: Model<Donation>,
    @InjectModel(Donor.name) private donorModel: Model<Donor>,
    @InjectModel(Donation.name) private BloodStockModel: Model<BloodStock>,
    private readonly DonorsService: DonorsService,
    private readonly BloodStockService: BloodStockService
    
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

  async nbreDonationsById(): Promise<Record<string, number>>{
    try{   
      const result=await this.DonationModel.aggregate([{
        $group:{
          _id:'$donor_id',
          count: { $sum: 1 }, 
        },
  
      }]);
      const groupedDonors: Record<string, number> = {};
       result.forEach((item:any) => {
        groupedDonors[item._id] = item.count;
      });
    
    return groupedDonors;
  } catch (error: any) {
       throw new Error(`Erreur ${error}`);
  }
  
  }

  async isApproved (donationId: string, status: string) {
    const donation = await this.DonationModel.findById(donationId).exec();

    if(!donation) {
      throw new UnauthorizedException("Donations does not exist");
    }

    if(donation.status == "pending") {
      if(status == "approved") {
        donation.status = "approved";
        const updateDto = {
          donor_id: donation.donor_id,
          donation_date: donation.donation_date,
          blood_type: donation.blood_type,
          quantity: donation.quantity,
          status: "approved",
          location: donation.location
        }
        await this.update(donation._id, updateDto);
       
        const bloodStockEntry = {
          blood_type: donation.blood_type,
          quantity: donation.quantity,
          storage_location: "Room 101", 
          expiry_date: this.calculateExpiryDate(donation.donation_date),
          last_update: new Date(),
        };
    
        // Save the new blood stock
        const createdBloodStock = await this.BloodStockService.create(bloodStockEntry);
        if (!createdBloodStock) {
          throw new Error('Failed to create blood stock');

        }
      }
      else {
        const updateDto = {
          donor_id: donation.donor_id,
          donation_date: donation.donation_date,
          blood_type: donation.blood_type,
          quantity: donation.quantity,
          status: "rejected",
          location: donation.location
        }
        await this.update(donation._id, updateDto);
      }
      
  
      return donation;
      
    }

  
  }

  private calculateExpiryDate(donation_date: Date) {
    const expiryDays = 42;
    const expiryDate = new Date(donation_date);

    expiryDate.setDate(expiryDate.getDate()+expiryDays);

    return expiryDate;
  }
}
