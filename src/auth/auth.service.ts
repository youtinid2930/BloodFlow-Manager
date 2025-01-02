import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';

import { LoginDto } from './dto/create-auth.dto';
import { User } from '../users/schemas/users.schema';
import { UsersService } from '../users/users.service';
import { AuthJwtPayload } from './types/auth-jwtPayload';
import { ObjectId } from 'mongodb';
import { JwtService } from '@nestjs/jwt';
import refreshJwtConfig from './config/refresh-jwt.config';
import { ConfigType } from '@nestjs/config';
import * as argon2 from "argon2";
import { CurrentUser } from './types/current-user';

dotenv.config();

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly UserModel: Model<User>,
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
    @Inject(refreshJwtConfig.KEY) private refreshTokenConfig: ConfigType<typeof refreshJwtConfig>
  ) {}

  async validateUser(loginDto: LoginDto): Promise<User> {
    const { email, password } = loginDto;
    
    const user = this.validateByEmail(email);
    
    
    const isPasswordValid = await bcrypt.compare(password, (await user).password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    // 
    // const accessToken = this.jwtService.sign(payload);
    
    // console.log("hello");
    
    return user;
  }

  async login(userId: ObjectId) {
    
    const {accessToken, refreshToken} = await this.generateTokens(userId);

    const hashedRefreshToken = await argon2.hash(refreshToken);

    await this.userService.updateUserRefreshTocken(userId, hashedRefreshToken);

    return {
      id: userId,
      accessToken,
      refreshToken,
    }
  }

  async generateTokens(userId: ObjectId) {
    const payload: AuthJwtPayload = {sub : userId};

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(payload, this.refreshTokenConfig),
    ]);

    return {
      accessToken,
      refreshToken
    }
  }

  async validateByEmail(email: string): Promise<User> {
    const user = await this.UserModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('User does not exist');
    }
    return user;
  }

  async verifyToken(token: string): Promise<boolean> {
    try {
      const secret = process.env.JWT_SECRET || 'defaultSecret';
      jwt.verify(token, secret);
      return true;
    } catch (error) {
      return false;
    }
  }

  async refreshToken(userId: ObjectId) {
    const {accessToken, refreshToken} = await this.generateTokens(userId);

    const hashedRefreshToken = await argon2.hash(refreshToken);

    await this.userService.updateUserRefreshTocken(userId, hashedRefreshToken);

    console.log("after updating the refrech tocken", refreshToken);

    return {
      id: userId,
      accessToken,
      refreshToken,
    }
  }

  async validateRefrechToken(userId: ObjectId, refrechTocken: string) {
    const user = await this.userService.findOne(userId);

    console.log("the hashed refrech tocken ", user?.refreshToken);

    if (!user || !user.refreshToken) {
      throw new UnauthorizedException("Invalid Refresh Tocken");
    }

    console.log("After the second validation")
    

    console.log("refrech tocken", refrechTocken);

    const refrechTockenMatches = await argon2.verify(user.refreshToken, refrechTocken);

    console.log("the result ", refrechTockenMatches);

    if(!refrechTockenMatches) {
      throw new UnauthorizedException("Invalid Refresh Tocken");
    }
    console.log("after the third verfication");
    return {id: userId};
  }

  async logout (userId: ObjectId) {
    console.log("for logout user id : ",userId);
    await this.userService.updateUserRefreshTocken(userId, "");
  }


  async validateJwtUser (userId: ObjectId) {
    const user = await this.userService.findOne(userId);

    if(!user) throw new UnauthorizedException("User not found !");

    const currentUser : CurrentUser  = {id: user.id, role: user.role};

    return currentUser;
  }
}
