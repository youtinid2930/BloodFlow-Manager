import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BloodStockService } from './blood_stock.service';
import { CreateBloodStockDto } from './dto/create-blood_stock.dto';
import { UpdateBloodStockDto } from './dto/update-blood_stock.dto';
import mongoose from 'mongoose'; 
import  Types from 'mongoose'

@Controller('blood-stock')
export class BloodStockController {
  constructor(private readonly bloodStockService: BloodStockService) {}

  @Post()
  create(@Body() createBloodStockDto: CreateBloodStockDto) {
    return this.bloodStockService.create(createBloodStockDto);
  }

  @Get()
  findAll() {
    return this.bloodStockService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bloodStockService.findOne(new mongoose.Types.ObjectId(id)); 
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBloodStockDto: UpdateBloodStockDto) {
    return this.bloodStockService.update(new mongoose.Types.ObjectId(id), updateBloodStockDto); 
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bloodStockService.remove(new mongoose.Types.ObjectId(id)); 
  }
}
