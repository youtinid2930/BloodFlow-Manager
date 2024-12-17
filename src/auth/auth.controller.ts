import { Controller, Post, Body, UseGuards, Get, Param, HttpCode, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from './dto/create-auth.dto';
import { User } from '../users/schemas/users.schema';
import { JwtAuthGuard } from './guards/jwt-auth.guard';



@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @HttpCode(HttpStatus.OK)
  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.authService.signUp(createUserDto);
  }
  @Post()
  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<{ accessToken: string }> {
    return this.authService.login(loginDto);
  }
  @Get('verify/:token')
  async verifyToken(@Param('token') token: string): Promise<{ valid: boolean }> {
    const valid = await this.authService.verifyToken(token);
    return { valid };
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Req() request: Request): Promise<User> {
    const user = request.user; 
    const validatedUser = await this.authService.validateUser(user.userId);
    
    if (!validatedUser) {
      throw new UnauthorizedException('User not found');
    }
  
    return validatedUser;
  }
}
