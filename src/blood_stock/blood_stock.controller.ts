import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BloodStockService } from './blood_stock.service';
import { CreateBloodStockDto } from './dto/create-blood_stock.dto';
import { UpdateBloodStockDto } from './dto/update-blood_stock.dto';
<<<<<<< HEAD
=======
import mongoose from 'mongoose'; 
>>>>>>> ffb8c53ed045b6f03afe75205f439d4039198d18

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
<<<<<<< HEAD
    return this.bloodStockService.findOne(+id);
=======
    return this.bloodStockService.findOne(new mongoose.Types.ObjectId(id)); 
>>>>>>> ffb8c53ed045b6f03afe75205f439d4039198d18
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBloodStockDto: UpdateBloodStockDto) {
<<<<<<< HEAD
    return this.bloodStockService.update(+id, updateBloodStockDto);
=======
    return this.bloodStockService.update(new mongoose.Types.ObjectId(id), updateBloodStockDto); 
>>>>>>> ffb8c53ed045b6f03afe75205f439d4039198d18
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
<<<<<<< HEAD
    return this.bloodStockService.remove(+id);
=======
    return this.bloodStockService.remove(new mongoose.Types.ObjectId(id)); 
>>>>>>> ffb8c53ed045b6f03afe75205f439d4039198d18
  }
}
