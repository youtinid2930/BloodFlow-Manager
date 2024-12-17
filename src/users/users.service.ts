import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/users.schema';
import { UpdateUserDto } from './dto/update-user.dto';



@Injectable()
export class UsersService {
  
  constructor(
    @InjectModel(User.name) private readonly UserModel: Model<User>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email, password, donor_id } = createUserDto;
    
    // hash the password
    const hashedPassword = await this.hashPassword(password);

    // Create a new user
    const newUser = new this.UserModel({
      email,
      password: hashedPassword,
      donor_id,
    });
    console.log(newUser);
    return newUser.save();
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }

  async findAll(): Promise<User[]> {
    return this.UserModel.find().exec();
  }

  async findOne(id: any): Promise<User | null> {
    return this.UserModel.findById(id).exec();
  }

  async update(id: any, updateUserDto: UpdateUserDto): Promise<User | null> {
    const updatedUser = await this.UserModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();

    if (!updatedUser) {
      throw new Error(`User with ID ${id} not found`);
    }

    if (updateUserDto.password) {
      const hashedPassword = await this.hashPassword(updateUserDto.password);
      updatedUser.password = hashedPassword;
    }

    return updatedUser.save();
  }
  async findOneById(id: string): Promise<User> {
    const user = await this.UserModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
  
  async remove(id: any): Promise<void> {
    await this.UserModel.findByIdAndDelete(id).exec();
  }
}
