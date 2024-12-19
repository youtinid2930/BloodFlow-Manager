import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { User } from '../users/schemas/users.schema';
import { UsersService } from '../users/users.service';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from '../users/dto/create-user.dto';
import * as dotenv from 'dotenv';
import { CreateDonorDto } from 'src/donors/dto/create-donor.dto';

dotenv.config();

@Injectable()
export class AuthService {

  constructor(
    @InjectModel(User.name) private readonly UserModel: Model<User>,
    private readonly usersService: UsersService, 
  ) {}


  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const { email, password } = loginDto;
    // search for the user by email
    // why the email? the email is the unique identifier that simple to manage
    const user = await this.UserModel.findOne({ email }).exec();
    
    // verfiynig the credetials
    // here we can more detail, if user exist , if password invalid 
    // the LoginDto verify that credentials shold not empty
    if (!user || !(await bcrypt.compare(password, user.password))) {
      // Here: that means the user has no account, so it should contact the admin 
      // or if he forget the password, then he can edit, by "Forget Password" part
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


