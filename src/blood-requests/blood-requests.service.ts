import { CreateRequestDto } from './dto/create-blood-requests.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose'; 
import { BloodRequest } from './schemas/blood-requests.schema';
import { UpdateRequestDto } from './dto/update-blood-requests.dto';
import { BloodStockService } from '../blood_stock/blood_stock.service';
import { EmailService } from '../mail/mailer.service';

@Injectable()
export class BloodRequestService {
  constructor(
    @InjectModel(BloodRequest.name) private RequestModel: Model<BloodRequest>,
    private readonly bloodStockService: BloodStockService,
    private readonly emailservice : EmailService,
  ) {}

  async create(createRequestDto: CreateRequestDto): Promise<BloodRequest> {
    const createdRequest = new this.RequestModel(createRequestDto);

    const savedRequest = await createdRequest.save();
    if (!savedRequest) {
      throw new Error('Failed to create request');
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
      throw new Error(`request with ID ${id} not found`);
    }
  
    return updatedRequest;
  }
  
  async remove(id: any): Promise<BloodRequest> {
    const removedRequest = await this.RequestModel.findByIdAndDelete(id).exec();
  
    if (!removedRequest) {
      throw new Error(`request with ID ${id} not found`);
    }
  
    return removedRequest;
  }

  async RepondreRequest_updateStock(bloodrequest: BloodRequest, availableStock : any, status: string, location : string ){
    await this.update(bloodrequest.id, { status });
    await this.bloodStockService.UpdateQuantity(bloodrequest.blood_type, -bloodrequest.quantity,location);
    //await this.sendNotification(bloodrequest, status);

  }


  async matchRequestWithStock() {
    try {
      // Fetch requests with status 'pending' or 'denied'
      const alldemondes = await this.RequestModel.find({
        status: { $in: ['pending', 'denied'] }
      }).exec();
  
      // Separate requests into urgent and regular
      const urgentdemondes = alldemondes.filter(demonde => demonde.urgent === true);
      const regulardemondes = alldemondes.filter(demonde => demonde.urgent !== true);
  
      // Process urgent requests
      await this.processRequests(urgentdemondes, 'urgent');
  
      // Process regular requests
      await this.processRequests(regulardemondes, 'regular');

      
    } catch (error) {
      console.error("Error processing requests:", error);
      throw new Error("Failed to process requests.");
    }
  }
  
  // Helper function to process each request (both urgent and regular)
  async processRequests(requests : BloodRequest[], type: string) {
    for (const request of requests) {
      try {
        const availableStock = await this.bloodStockService.getStocksByBloodType_etQTE(request.blood_type, request.quantity);
  
        if (availableStock && availableStock.length > 0) {
          // Respond to the request if stock is available
          for (const stock of availableStock) {
            const location = stock.storage_location;
            await this.RepondreRequest_updateStock(request, availableStock, 'responded', location);
          }
          return "Reponde to requests with success";
        } else {
          // Deny the request if no stock is available
          await this.update(request.id, { status: 'denied' });
          //send notification that this stock is low




          ///
          console.log(`${type} request ID ${request.id} denied due to insufficient stock.`);
          // You can add a notification here if needed
          return `${type} request ID ${request.id} denied due to insufficient stock.`;
        }
      } catch (error) {
        console.error(`Error handling ${type} request ID ${request.id}:`, error);
      }
    }
  }
  

}