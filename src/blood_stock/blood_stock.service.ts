import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {Types} from 'mongoose';
import { BloodStock } from './schemas/blood_stock.schema';
import { CreateBloodStockDto } from './dto/create-blood_stock.dto';
import { UpdateBloodStockDto } from './dto/update-blood_stock.dto';
import { EmailService } from '../mail/mailer.service';
import { DonorsService } from '../donors/donors.service';
import * as dotenv from 'dotenv';


dotenv.config();

@Injectable()
export class BloodStockService {
  constructor(
    @InjectModel(BloodStock.name) private readonly bloodStockModel: Model<BloodStock>,
    private readonly emailService: EmailService,
    private readonly donorsService: DonorsService,
    
  ) {}

  async create(createBloodStockDto: CreateBloodStockDto): Promise<BloodStock> {
    const { blood_type, storage_location, quantity, expiry_date ,last_update} = createBloodStockDto;
  
    // Check if a blood stock with the same blood type and storage location exists
    const existingBloodStock = await this.bloodStockModel.findOne({ 
      blood_type, 
      storage_location 
    });
  
    if (existingBloodStock) {
      // Update the existing record
      existingBloodStock.quantity += quantity;
      existingBloodStock.expiry_date = expiry_date;
      existingBloodStock.last_update = last_update;
  
      const updatedBloodStock = await existingBloodStock.save();
      if (!updatedBloodStock) {
        throw new Error('Failed to update blood stock');
      }
      return updatedBloodStock;
    }
  
    // Create a new blood stock if no match is found
    const createdBloodStock = new this.bloodStockModel(createBloodStockDto);
    const savedBloodStock = await createdBloodStock.save();
    if (!savedBloodStock) {
      throw new Error('Failed to create blood stock');
    }
    return savedBloodStock;
  }
  

  findAll() {
    return this.bloodStockModel.find().exec();
  }

  findOne(id: any) {
    return this.bloodStockModel.findById(id).exec();
  }

  async update(id: any, updateBloodStockDto: UpdateBloodStockDto): Promise<BloodStock> {
    const updatedBloodStock = await this.bloodStockModel
      .findByIdAndUpdate(id, updateBloodStockDto, { new: true })
      .exec();

    if (!updatedBloodStock) {
      throw new Error(`Blood stock with ID ${id} not found`);
    }

    return updatedBloodStock;
  }

  async remove(id: any): Promise<BloodStock> {
    const removedBloodStock = await this.bloodStockModel.findByIdAndDelete(id).exec();

    if (!removedBloodStock) {
      throw new Error(`Blood stock with ID ${id} not found`);
    }

    return removedBloodStock;
  }



  ///500 is the low for blood stock
  async findLowStock(): Promise<BloodStock[]> {
    return this.bloodStockModel.find({ quantity: { $lt: 500 } }).exec();
  }


  // 1 unit is the low ok!!
  // 1 unit of blood is 500 mL
  async notifyLowStock() {
    const lowStockItems = await this.bloodStockModel.find({ quantity: { $lt: 500 } }).exec();
    if (lowStockItems.length > 0) {
      const emailRecipients = process.env.ADMIN_MAIL as string; //admins
      let message = '';

      console.log(`${emailRecipients} + ${lowStockItems}`)
      for (const item of lowStockItems) {
        message += `${item.blood_type} in low stock!\n`;
      }

      await this.emailService.sendMail(
        emailRecipients,
        'ALERT: Low Blood Stock',
        message,
      );
      
    }
  }

  async findAndNotifyLowStock(): Promise<BloodStock[]> {
    // Find items with low stock (quantity less than 500)
    const lowStockItems = await this.bloodStockModel.find({ quantity: { $lt: 500 } }).exec();
    
    // If there are low stock items, send an alert
    if (lowStockItems.length > 0) {
      const emailRecipients = process.env.ADMIN_MAIL as string; // admins
      let message = '';
  
      // Build the message with blood types in low stock
      for (const item of lowStockItems) {
        message += `${item.blood_type} in low stock!\n`;
      }
  
      // Send the email notification
      await this.emailService.sendMail(
        emailRecipients,
        'ALERT: Low Blood Stock',
        message,
      );
    }
  
    // Return the list of low stock items
    return lowStockItems;
  }
  

  async findExpired(): Promise<BloodStock[]> {
    const currentDate = new Date();
    
    const expiredBloodStocks = await this.bloodStockModel.find({ expiry_date: { $lt: currentDate } }).exec();
  
    if (expiredBloodStocks.length > 0) {
      const emailRecipients = process.env.ADMIN_MAIL as string;
      let message = 'ALERT: Expired Blood Stock\n';
  
      for (const stock of expiredBloodStocks) {
        message += `Blood Type: ${stock.blood_type}, Storage Location: ${stock.storage_location}\n`;
      }
  
      await this.emailService.sendMail(
        emailRecipients,
        'ALERT: Expired Blood Stock',
        message,
      );
    }
  
    return expiredBloodStocks;
  }
  


  async getAvailableStock(blood_type: string, storage_location: string): Promise<BloodStock | null> {
    
    return this.bloodStockModel.findOne({ blood_type, storage_location, quantity: { $gt: 0 } });

  }


  async getStocksByBloodType_etQTE(bloodType: string, qte: number): Promise<BloodStock[]> {
    const currentDate = new Date();
    const resulat = await this.bloodStockModel.find({ blood_type: { $eq : bloodType}, quantity: { $gte: qte }, expiry_date: { $gte: currentDate }}).sort({ expiry_date: 1 }).exec();
    if (resulat.length === 0) {
      return [];
    }
    return resulat;
  
  }


  //.sort({ expiry_date: 1 })  asture wa3r sort by expired
  
  async UpdateQuantity(blood_type: string, quantity: number,location : string) {
    const stock = await this.bloodStockModel.findOne({ blood_type, storage_location: location }).exec();

    if (!stock) {
      throw new Error('Le stock de sang demandé n\'existe pas.');
    }

    const newQuantity = stock.quantity + quantity;

    if (newQuantity < 0) {
      throw new Error('La quantité de sang ne peut pas être négative.');
    }

    stock.quantity = newQuantity;
    await stock.save();

    return stock;
  }



  async searchStocks(blood_type?: string, storage_location?: string, min_quantity?: number, max_quantity?: number) {
    const filter: any = {};

    if (blood_type) {
      filter.blood_type = blood_type;
    }
    if (storage_location) {
      filter.storage_location = storage_location;
    }

    if (min_quantity !== undefined || max_quantity !== undefined) {
      filter.quantity = {};
      if (min_quantity !== undefined) {
        filter.quantity.$gte = min_quantity;
      }
      if (max_quantity !== undefined) {
        filter.quantity.$lte = max_quantity;
      }
    }

    return this.bloodStockModel.find(filter).exec();
  }


  async getSommeByBloodType() {
    const aggregate = [
      { $group: { _id: '$blood_type', totalQuantity: { $sum: '$quantity' } } },
    ];
    return this.bloodStockModel.aggregate(aggregate).exec();
  }

  async updateExpiryDate(id: string, newExpiryDate: Date): Promise<BloodStock> {
    const bloodStock = await this.bloodStockModel.findById(id).exec();
    if (!bloodStock) {
      throw new Error(`Blood stock with ID ${id} not found`);
    }
    bloodStock.expiry_date = newExpiryDate;
    return bloodStock.save();
  }

  async getStocksNearExpiry(daysBeforeExpiry: number): Promise<BloodStock[]> {
    const currentDate = new Date();
    const expirySeuil = new Date(currentDate.setDate(currentDate.getDate() + daysBeforeExpiry));
    
    const nearExpiryStocks = await this.bloodStockModel.find({ expiry_date: { $lt: expirySeuil } }).exec();
  
    if (nearExpiryStocks.length > 0) {
      const emailRecipients = process.env.ADMIN_MAIL as string;
      let message = `ALERT: Blood Stocks Near Expiry\n`;
  
      for (const stock of nearExpiryStocks) {
        message += `Blood Type: ${stock.blood_type}, Storage Location: ${stock.storage_location}, Expiry Date: ${stock.expiry_date.toDateString()}\n`;
      }
  
      await this.emailService.sendMail(
        emailRecipients,
        'ALERT: Blood Stocks Near Expiry',
        message,
      );
    }
  
    return nearExpiryStocks;
  }
  

  async notifyDonorstoDonate(bloodType: string): Promise<void> {
    const eligibleDonors = await this.donorsService.eligible(bloodType);

    if (eligibleDonors.length > 0) {
      const emailRecipients = eligibleDonors.map(donor => donor.email).join(', ');
      const message = `
        ALERT: Request for Blood Donation

        Dear Donor,

        We are reaching out to kindly ask you to donate blood as soon as possible. Your blood type (${bloodType}) is urgently needed due to expired stock.

        Please visit your nearest donation center to help save lives.

        Thank you for your support!
      `;

      await this.emailService.sendMail(
        emailRecipients,
        'Urgent Blood Donation Request',
        message,
      );
    }
  }

}
