import { Controller, Post, Body, UseGuards, Get, Param, HttpCode, HttpStatus, UnauthorizedException, Request } from '@nestjs/common';
import { Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from './dto/create-auth.dto';
import { User } from '../users/schemas/users.schema';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { GoogleAuthGuard } from './guards/Guard';
import { LocalAuthGuard } from './guards/local-auth/local-auth.guard';
import { AuthenticatedRequest } from '../interfaces/authenticated-request';
import { RefreshAuthGuard } from './guards/auth-refresh/auth-refresh.guard';



@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @HttpCode(HttpStatus.OK)
  @Post()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: AuthenticatedRequest){
    return this.authService.login(req.user._id);
    
  }
  
  
  @Get('verify/:token')
  async verifyToken(@Param('token') token: string): Promise<{ valid: boolean }> {
    const valid = await this.authService.verifyToken(token);
    return { valid };
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Req() request: any): Promise<User> {
    const user = request.user; 
    const validatedUser = await this.authService.validateUser(user.email);
    
    if (!validatedUser) {
      throw new UnauthorizedException('User not found');
    }
  
    return validatedUser;
  }

  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  handleLogin() {
    return { msg: "Google Authentication" };
  }

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  handleRedirect() {
    return {msg: "OK"};
  }
  
  @UseGuards(RefreshAuthGuard)
  @Post('refresh')
  refreshToken(@Request() req: AuthenticatedRequest) {
    console.log("inside the controler ", req.user.id);
    return this.authService.refreshToken(req.user.id);
  }


  @UseGuards(JwtAuthGuard)
  @Post("logout") 
  logout (@Request() req: AuthenticatedRequest) {
    console.log("Starting logout...");
    console.log("Request user:", req.user);

    this.authService.logout(req.user.id);
    return { message: "Logout successful" };
  }

}