import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { DonationService } from './donations.service';
import { CreateDonationDto } from './dto/create-donation.dto';
import { UpdateDonationDto } from './dto/update-donation.dto';
import mongoose from 'mongoose'; 

@Controller('donations')
export class DonationsController {
  constructor(private readonly donationsService: DonationService) {}

  @Post()
  create(@Body() createDonationDto: CreateDonationDto) {
    return this.donationsService.create(createDonationDto);
  }

  @Get()
  findAll() {
    return this.donationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.donationsService.findOne(id);
  }
  
  

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDonationDto: UpdateDonationDto) {
    return this.donationsService.update(id, updateDonationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.donationsService.remove(id);
  }

  @Get('get/nbreDonationsById')
  async nbreDonationsForId():Promise<Record<string,number>>{
   return this.donationsService.nbreDonationsById();

  }

  @Post('isApproved/:status')
  async isApproved (@Query('donationId') donationId : string, @Param('status') status: string) {
    return this.donationsService.isApproved(donationId, status);
  }
}
