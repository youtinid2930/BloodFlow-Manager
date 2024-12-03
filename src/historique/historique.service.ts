import { CreateHistoriqueDto } from './dto/create-historique.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose'; // Import Types for ObjectId
import { Historique } from './schemas/historique.schema';
import { UpdateHistoriqueDto } from './dto/update-historique.dto';

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
}
