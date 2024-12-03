import { CreateRequestDto } from './dto/create-request.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose'; 
import { Request } from './schemas/request.schema';
import { UpdateRequestDto } from './dto/update-request.dto';

@Injectable()
export class RequestService {
  constructor(
    @InjectModel(Request.name) private RequestModel: Model<Request>,
  ) {}

  async create(createRequestDto: CreateRequestDto): Promise<Request> {
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
  
  async update(id: any, updateRequestDto: UpdateRequestDto): Promise<Request> {
    const updatedRequest = await this.RequestModel
      .findByIdAndUpdate(id, updateRequestDto, { new: true })
      .exec();
  
    if (!updatedRequest) {
      throw new Error(`Blood stock with ID ${id} not found`);
    }
  
    return updatedRequest;
  }
  
  async remove(id: any): Promise<Request> {
    const removedRequest = await this.RequestModel.findByIdAndDelete(id).exec();
  
    if (!removedRequest) {
      throw new Error(`Blood stock with ID ${id} not found`);
    }
  
    return removedRequest;
  }
}
