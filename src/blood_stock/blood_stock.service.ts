import { CreateBloodStockDto } from './dto/create-blood_stock.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose'; // Import Types for ObjectId
import { BloodStock } from './schemas/blood_stock.schema';
import { UpdateBloodStockDto } from './dto/update-blood_stock.dto';

@Injectable()
export class BloodStockService {
  constructor(
    @InjectModel(BloodStock.name) private bloodStockModel: Model<BloodStock>,
  ) {}

  async create(createBloodStockDto: CreateBloodStockDto): Promise<BloodStock> {
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
}
