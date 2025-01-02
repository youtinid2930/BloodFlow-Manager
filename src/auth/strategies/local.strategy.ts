import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";
import { LoginDto } from "../dto/create-auth.dto";
import { User } from "../../users/schemas/users.schema";


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private readonly authService: AuthService) {
        super({
            usernameField: 'email', // Specify 'email' instead of the default 'username'
        });
    }

    async validate(email: string, password: string): Promise<User> {
        const loginDto = { email, password }; // Create a LoginDto-like object
        
        const user = await this.authService.validateUser(loginDto);

        if (!user) {
            throw new UnauthorizedException('Invalid email or password');
        }

        return user; // Return the access token or user information
    }
}