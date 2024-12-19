import { CreateRequestDto } from './dto/create-blood-requests.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose'; 
import { BloodRequest } from './schemas/blood-requests.schema';
import { UpdateRequestDto } from './dto/update-blood-requests.dto';
import { BloodStockService } from '../blood_stock/blood_stock.service';
import { EmailService } from '../email/email.service';
import { elementAt } from 'rxjs';

@Injectable()
export class BloodRequestService {
  constructor(
    @InjectModel(BloodRequest.name) private RequestModel: Model<BloodRequest>,
    private readonly bloodStockService: BloodStockService,
    private readonly emailService: EmailService,
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


  // Automatically match request with available stock and prioritize urgent ones
  async matchRequestWithStock() {

    try {
    const alldemondes = await this.RequestModel.find().exec();
    const urgentdemondes = alldemondes.filter(demonde => demonde.urgent === true);
    const regulardemondes= alldemondes.filter(demonde => demonde.urgent !== true);

    //hundle urgent request
    for (const urdemonde of urgentdemondes) {

      try {
      const availableStock = await this.bloodStockService.getStocksByBloodType_etQTE(urdemonde.blood_type,urdemonde.quantity);
      
      
        if (availableStock) {
          for (const element of availableStock) {
          const location = element.storage_location;
          await this.RepondreRequest_updateStock(urdemonde, availableStock, 'reponded',location);
        }
      }
        else {
          await this.update(urdemonde.id, { status: 'Denied' });
          // await this.sendNotification(request, 'Denied');
        }
      

      }
    
    catch(error){
      console.error(`Error handling urgent request ID ${urdemonde.id}:`, error);

    }

  }
  

    // Handle regular requests
    for (const regurdemonde of regulardemondes) {

      try{
      const availableStock = await this.bloodStockService.getStocksByBloodType_etQTE(regurdemonde.blood_type,regurdemonde.quantity);
      if (availableStock.length > 0) {
        
        for (const element of availableStock) {
        const location = element.storage_location;
        await this.RepondreRequest_updateStock(regurdemonde, availableStock, 'reponded',location);
      }
    }
      else {
        await this.update(regurdemonde.id, { status: 'Denied' });
        // await this.sendNotification(regularRequest, 'Denied');
      }
      
    
  }
    catch (error){
        console.error(`Error handling regular request ID ${regurdemonde.id}:`, error);
    }
    
    }
  }
  catch (error) {
    console.error("Error recuperation requests:", error);
    throw new Error("Failed to process requests.");
  }

  }





}
