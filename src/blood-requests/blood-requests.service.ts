import { CreateRequestDto } from './dto/create-blood-requests.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose'; 
import { BloodRequest } from './schemas/blood-requests.schema';
import { UpdateRequestDto } from './dto/update-blood-requests.dto';

@Injectable()
export class BloodRequestService {
  constructor(
    @InjectModel(BloodRequest.name) private RequestModel: Model<BloodRequest>,
  ) {}

  async create(createRequestDto: CreateRequestDto): Promise<BloodRequest> {
    const createdRequest = new this.RequestModel(createRequestDto);

    const savedRequest = await createdRequest.save();
    if (!savedRequest) {
      throw new Error('Failed to create blood stock');
    }

    return savedRequest;
  }

  findAll() {
    return this.RequestModel.find().exec();
  }

  findOne(id: any) {
    return this.RequestModel.findById(id).exec();
  }
  
  async update(id: any, updateRequestDto: UpdateRequestDto): Promise<BloodRequest> {
    const updatedRequest = await this.RequestModel
      .findByIdAndUpdate(id, updateRequestDto, { new: true })
      .exec();
  
    if (!updatedRequest) {
      throw new Error(`Blood stock with ID ${id} not found`);
    }
  
    return updatedRequest;
  }
  
  async remove(id: any): Promise<BloodRequest> {
    const removedRequest = await this.RequestModel.findByIdAndDelete(id).exec();
  
    if (!removedRequest) {
      throw new Error(`Blood stock with ID ${id} not found`);
    }
  
    return removedRequest;
  }
}
