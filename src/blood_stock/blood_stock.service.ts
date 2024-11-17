
import { CreateBloodStockDto } from './dto/create-blood_stock.dto';
import { UpdateBloodStockDto } from './dto/update-blood_stock.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BloodStock } from './schemas/blood_stock.schema';



@Injectable()
export class BloodStockService {
  create(createBloodStockDto: CreateBloodStockDto) {
    return 'This action adds a new bloodStock';
  }

  findAll() {
    return `This action returns all bloodStock`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bloodStock`;
  }

  update(id: number, updateBloodStockDto: UpdateBloodStockDto) {
    return `This action updates a #${id} bloodStock`;
  }

  remove(id: number) {
    return `This action removes a #${id} bloodStock`;
  }
}
