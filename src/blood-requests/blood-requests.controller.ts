import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BloodRequestService } from './blood-requests.service';
import { CreateRequestDto } from './dto/create-blood-requests.dto';
import {  UpdateRequestDto} from './dto/update-blood-requests.dto';

@Controller('bloodrequest')
export class BloodRequestController {
  constructor(private readonly requestsService: BloodRequestService) {}

  @Post()
  create(@Body() createRequestDto: CreateRequestDto) {
    return this.requestsService.create(createRequestDto);
  }

  @Get()
  findAll() {
    return this.requestsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.requestsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRequestDto: UpdateRequestDto) {
    return this.requestsService.update(+id, updateRequestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.requestsService.remove(+id);
  }

  @Post('request/match-requests')
  async matchRequestsWithStock() {
    return await this.requestsService.matchRequestWithStock();
  }
}
