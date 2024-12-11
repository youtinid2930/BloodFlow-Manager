<<<<<<< HEAD
import { Injectable } from '@nestjs/common';
import { CreateHistoriqueDto } from './dto/create-historique.dto';
=======
import { CreateHistoriqueDto } from './dto/create-historique.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose'; // Import Types for ObjectId
import { Historique } from './schemas/historique.schema';
>>>>>>> ffb8c53ed045b6f03afe75205f439d4039198d18
import { UpdateHistoriqueDto } from './dto/update-historique.dto';

@Injectable()
export class HistoriqueService {
<<<<<<< HEAD
  create(createHistoriqueDto: CreateHistoriqueDto) {
    return 'This action adds a new historique';
  }

  findAll() {
    return `This action returns all historique`;
  }

  findOne(id: number) {
    return `This action returns a #${id} historique`;
  }

  update(id: number, updateHistoriqueDto: UpdateHistoriqueDto) {
    return `This action updates a #${id} historique`;
  }

  remove(id: number) {
    return `This action removes a #${id} historique`;
=======
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
>>>>>>> ffb8c53ed045b6f03afe75205f439d4039198d18
  }
}
