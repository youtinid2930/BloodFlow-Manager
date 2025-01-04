import { Controller, Get, Post, Body, Patch, Param, Delete,Query } from '@nestjs/common';
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

  //search by id or name
  @Get(':id')
  findOne(@Param('id') id: string) {
    
    return this.donorsService.findOne(id);
  }
  

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDonorDto: UpdateDonorDto) {
    return this.donorsService.update(id, updateDonorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.donorsService.remove(id);
  }

  @Get('eligibility/:id')
  eligibility(@Param('id') id:string){
    return this.donorsService.eligibility_check(id);
  }

  @Get('eligible/:bloodType')
  eligible(@Param('bloodType') bt:string){
    return this.donorsService.eligible(bt);
  }
  
  @Get('getdonors/by-types')
   async groupe_by_type(){
    return await this.donorsService.donorsByType();
   }

  @Get('getdonors/:type')
     async getByType(@Param('type')type:string) {
      return await this.donorsService.getDonorByType(type);

     }
}
