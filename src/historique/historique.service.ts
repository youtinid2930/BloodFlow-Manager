import { CreateHistoriqueDto } from './dto/create-historique.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose'; // Import Types for ObjectId
import { Historique } from './schemas/historique.schema';
import { UpdateHistoriqueDto } from './dto/update-historique.dto';
import { HistoriqueModule } from './historique.module';
import * as fs from 'fs'; 
import { BloodStockModule } from 'src/blood_stock/blood_stock.module';

@Injectable()
export class HistoriqueService {
  constructor(
    @InjectModel(Historique.name) private HistoriqueModel: Model<Historique>,
  ) {}

  async create(createHistoriqueDto: CreateHistoriqueDto): Promise<Historique> {
    const createdHistorique = new this.HistoriqueModel(createHistoriqueDto);

    const savedHistorique = await createdHistorique.save();
    if (!savedHistorique) {
      throw new Error('Failed to create blood stock');
    }

    return savedHistorique;
  }

  findAll() {
    return this.HistoriqueModel.find().exec();
  }

  findOne(id: any) {
    return this.HistoriqueModel.findById(id).exec();
  }
  
  async update(id: any, updateHistoriqueDto: UpdateHistoriqueDto): Promise<Historique> {
    const updatedHistorique = await this.HistoriqueModel
      .findByIdAndUpdate(id, updateHistoriqueDto, { new: true })
      .exec();
  
    if (!updatedHistorique) {
      throw new Error(`Blood stock with ID ${id} not found`);
    }
  
    return updatedHistorique;
  }
  
  async remove(id: any): Promise<Historique> {
    const removedHistorique = await this.HistoriqueModel.findByIdAndDelete(id).exec();
  
    if (!removedHistorique) {
      throw new Error(`Blood stock with ID ${id} not found`);
    }
  
    return removedHistorique;
  }




  async getHistoriqueByType(type: string): Promise<Historique[]> {
    return this.HistoriqueModel.find({ type }).exec();
  }
  
  async getRecentHistory(nbre:number):Promise<Historique[]>{

     return this.HistoriqueModel.find().sort({created_at:-1}).limit(nbre);

  }

  async exportHistoryAsCSV(): Promise<string> {

    const historys = await this.HistoriqueModel.find().exec();
    if (historys.length === 0) {

      throw new Error('No historique data');
   
    }

    const header='ID,Type,Details,Date\n';
    const rows = historys.map(element => {
      return `${element._id},${element.type},${element.details},${element.related_ids.toString()}`;
    });

    const csvText=header+rows.join('\n');
    fs.writeFileSync('Data_Historique.csv',csvText);


    return csvText;
  }



  






}