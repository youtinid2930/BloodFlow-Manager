import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { User } from '../users/schemas/users.schema';
import { UsersService } from '../users/users.service';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from '../users/dto/create-user.dto';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class AuthService {

  constructor(
    @InjectModel(User.name) private readonly UserModel: Model<User>,
    private readonly usersService: UsersService, 
  ) {}

  
  async signUp(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.usersService.findOne(createUserDto.email);
    if (createUserDto.email) {
      // that's mean that this user has already an account
      // we need here to return a message that the user already exist.
      throw new UnauthorizedException("This User email is already exist");
    }
    return this.usersService.create(createUserDto);
  }

  async login(loginDto: { email: string, password: string }): Promise<{ accessToken: string }> {
    const { email, password } = loginDto;
    const user = await this.UserModel.findOne({ email }).exec();

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { userId: user._id };
    const accessToken = this.generateToken(payload);
    return { accessToken };
  }

  private generateToken(payload: object): string {
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }
    const secret = process.env.JWT_SECRET;
    return jwt.sign(payload, secret, { expiresIn: '1h' });
  }
  
  async validateUser(id: string): Promise<User | null> {
    return this.usersService.findOneById(id); 
  }

  async verifyToken(token: string): Promise<boolean> {
    try {
      if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined in environment variables');
      }
      jwt.verify(token, process.env.JWT_SECRET);
      return true;
    } catch (error) {
      return false;
    }
  }

}


