import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';
import { User } from './schemas/users.schema';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateDonorDto } from '../donors/dto/create-donor.dto';
import { DonorsService } from '../donors/donors.service';




@Injectable()
export class UsersService {
  
  constructor(
    @InjectModel(User.name) private readonly UserModel: Model<User>,
    private readonly donorsService: DonorsService,
  ) {}
  
  async create(createUserDto: any, createDonorDto: CreateDonorDto): Promise<User> {
    const { email, password, role } = createUserDto;
    // first : Create the Donor
    const donor = await this.donorsService.create(createDonorDto);
    // hash the password
    const hashedPassword = await this.hashPassword(password);

    // Create a new user
    const newUser = new this.UserModel({
      email,
      password: hashedPassword,
      donor_id: donor._id,
      role: role,
    });
    console.log(newUser);
    
    
    return newUser.save();
  }


  // we will use this to hash the password
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }

  
  // 2...
  async findAll(): Promise<User[]> {
    return this.UserModel.find().exec();
  }

  // 3...

  async findOne(id: ObjectId){
    console.log("the id inside findOne is ", id);
    return this.UserModel.findById(id).exec();
  }

  // 4...

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

  // 5...
  async findOneById(id: string): Promise<User> {
    const user = await this.UserModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
  
  // 6...
  async remove(id: any): Promise<void> {
    await this.UserModel.findByIdAndDelete(id).exec();
  }

  // 7...
  async updateUserRefreshTocken (userId: ObjectId, hashedRefreshToken: string) {
    const updatedUser = await this.UserModel.findByIdAndUpdate(userId).exec();

    if (!updatedUser) {
      throw new Error(`User with ID ${userId} not found`);
    }
    updatedUser.refreshToken = hashedRefreshToken;
    return updatedUser.save();
  }

  // 8...
  async findByEmail(email: string): Promise<User> {
    const user = await this.UserModel.findOne({ email }).lean<User>().exec();

    console.log("this inside the findByEmail ", user);
  
    if (!user) {
      throw new UnauthorizedException("User Not Found");
    }
  
    return user; // Now the return type matches `User`.
  }
}
