import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DonorsService } from './donors.service';
import { CreateDonorDto } from './dto/create-donor.dto';
import { UpdateDonorDto } from './dto/update-donor.dto';

@Controller('donors')
export class DonorsController {
  constructor(private readonly donorsService: DonorsService) {}

  @Post()
  create(@Body() createDonorDto: CreateDonorDto) {
    return this.donorsService.create(createDonorDto);
  }

  @Get()
  findAll() {
    return this.donorsService.findAll();
  }

<<<<<<< HEAD
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.donorsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDonorDto: UpdateDonorDto) {
    return this.donorsService.update(+id, updateDonorDto);
=======

  //search by id or name
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.donorsService.findOne(id);
  }
  

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDonorDto: UpdateDonorDto) {
    return this.donorsService.update(id, updateDonorDto);
>>>>>>> ffb8c53ed045b6f03afe75205f439d4039198d18
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
<<<<<<< HEAD
    return this.donorsService.remove(+id);
=======
    return this.donorsService.remove(id);
>>>>>>> ffb8c53ed045b6f03afe75205f439d4039198d18
  }
}
