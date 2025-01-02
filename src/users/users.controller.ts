import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateDonorDto } from '../donors/dto/create-donor.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth/jwt-auth.guard';
import { ObjectId } from 'mongodb';
import { AuthenticatedRequest } from '../interfaces/authenticated-request';
import { Roles } from '../roles/decorators/role.decorator';
import { Role } from '../roles/enum/role.enum';
import { RolesGuard } from '../roles/guards/roles/roles.guard';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body('user') createUserDto: any, @Body('donor') createDonorDto: CreateDonorDto) {
    return this.usersService.create(createUserDto, createDonorDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.admin)
  @Get('profile')
  profile(@Request() req: AuthenticatedRequest) {
    console.log('Request User:', req.user);
    return this.usersService.findOne(req.user.id);
  }
  
  @Get(':id')
  findOne(@Param('id') id: ObjectId) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
