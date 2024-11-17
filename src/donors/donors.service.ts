import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDonorDto } from './dto/create-donor.dto';
import { UpdateDonorDto } from './dto/update-donor.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Donor } from './schemas/donor.schema';

@Injectable()
export class DonorsService {
  create(createDonorDto: CreateDonorDto) {
    return 'This action adds a new donor';
  }

  findAll() {
    return `This action returns all donors`;
  }

  findOne(id: number) {
    return `This action returns a #${id} donor`;
  }

  update(id: number, updateDonorDto: UpdateDonorDto) {
    return `This action updates a #${id} donor`;
  }

  remove(id: number) {
    return `This action removes a #${id} donor`;
  }
}
