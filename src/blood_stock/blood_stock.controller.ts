import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { BloodStockService } from './blood_stock.service';
import { CreateBloodStockDto } from './dto/create-blood_stock.dto';
import { UpdateBloodStockDto } from './dto/update-blood_stock.dto';
import mongoose from 'mongoose';

@Controller('blood-stock')
export class BloodStockController {
  constructor(private readonly bloodStockService: BloodStockService) {}

  @Post()
  async create(@Body() createBloodStockDto: CreateBloodStockDto) {
    try {
      return await this.bloodStockService.create(createBloodStockDto);
    } catch (error) {
      console.error('Error creating blood stock:', error);
      throw new Error('Failed to create blood stock');
    }
  }

  @Get('all')
  async findAll() {
    try {
      return await this.bloodStockService.findAll();
    } catch (error) {
      console.error('Error fetching all blood stocks:', error);
      throw new Error('Failed to fetch blood stocks');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.bloodStockService.findOne(id);
    } catch (error) {
      console.error('Error fetching blood stock by id:', error);
      throw new Error(`Failed to fetch blood stock with ID ${id}`);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateBloodStockDto: UpdateBloodStockDto) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.error('Invalid ObjectId:', id);
      throw new Error('Invalid ObjectId');
    }
    try {
      return await this.bloodStockService.update(id, updateBloodStockDto);
    } catch (error) {
      console.error('Error updating blood stock:', error);
      throw new Error('Failed to update blood stock');
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.error('Invalid ObjectId:', id);
      throw new Error('Invalid ObjectId');
    }
    try {
      return await this.bloodStockService.remove(id);
    } catch (error) {
      console.error('Error deleting blood stock:', error);
      throw new Error('Failed to delete blood stock');
    }
  }

  @Get('find/low-stock')
  async findLowStock() {
    try {
      return await this.bloodStockService.findLowStock();
    } catch (error) {
      console.error('Error fetching low stock:', error);
      throw new Error('Failed to fetch low stock');
    }
  }


  @Get('notify/low-stock')  
  async notifyLowStock(): Promise<string> {
    try {
      await this.bloodStockService.notifyLowStock();  // Call the service method
      return 'Low stock notification sent successfully.';
    } catch (error) {
      console.error(error);
      return 'Failed to send low stock notification.';
    }
  }

  @Get('find&Notify/low-stock')  
  async findAndNotifyLowStock(){
    try {
      return await this.bloodStockService.findAndNotifyLowStock();
    } catch (error) {
      console.error(error);
      return 'Failed to send low stock notification.';
    }
  }


  @Get('stock/expired')
  async findExpired() {
    try {
      return await this.bloodStockService.findExpired();
    } catch (error) {
      console.error('Error fetching expired stock:', error);
      throw new Error('Failed to fetch expired stock');
    }
  }

  @Get('stock/search')
  async searchStocks(
    @Body('blood_type') blood_type?: string,
    @Body('storage_location') storage_location?: string,
    @Body('min_quantity') min_quantity?: number,
    @Body('max_quantity') max_quantity?: number,
  ) {
    try {
      return await this.bloodStockService.searchStocks(blood_type,storage_location,min_quantity,max_quantity);
    } catch (error) {
      console.error('Error searching stocks:', error);
      throw new Error('Failed to search stocks');
    }
  }

  @Get('get/getStockByType-Qte/:bloodType/:qte')
  async getStocksByBloodType(@Param('bloodType') bloodType: string, @Param('qte') qte: number) {
    try {
      return await this.bloodStockService.getStocksByBloodType_etQTE(bloodType, qte);
    } catch (error) {
      console.error('Error fetching stocks by blood type:', error);
      throw new Error(`${bloodType},${qte}`);
    }
  }


  @Get('stock/sommeby-blood')
  async getStockSummaryByBloodType() {
    try {
      return await this.bloodStockService.getSommeByBloodType();
    } catch (error) {
      console.error('Error fetching stock summary by blood type:', error);
      throw new Error('Failed to fetch stock summary');
    }
  }

  @Patch('update-expiry-date/:id')
  async updateExpiryDate(
    @Param('id') id: string,
    @Body('newExpiryDate') newExpiryDate: Date,
  ) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.error('Invalid ObjectId:', id);
      throw new Error('Invalid ObjectId');
    }
    try {
      return await this.bloodStockService.updateExpiryDate(id, newExpiryDate);
    } catch (error) {
      console.error('Error updating expiry date:', error);
      throw new Error('Failed to update expiry date');
    }
  }

  @Get('stocks-near-expiry')
  async getStocksNearExpiry(@Query('daysBeforeExpiry') daysBeforeExpiry: number) {
    try {
      return await this.bloodStockService.getStocksNearExpiry(daysBeforeExpiry);
    } catch (error) {
      console.error('Error fetching stocks near expiry:', error);
      throw new Error('Failed to fetch stocks near expiry');
    }
  }

  ///greatest one



}
