import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy } from "passport-google-oauth20";
import * as dotenv from 'dotenv';
import { Injectable } from "@nestjs/common";
import { AuthService } from "../auth.service";

dotenv.config();

@Injectable()
export class GoogleSrategy extends PassportStrategy(Strategy) {
    
    constructor( private readonly authService: AuthService) {
        super({
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: process.env.REDIRECT_URL,
            scope: ['profile', 'email'],
        });
    }


    async validate(accessToken: string, refreshTocken: string, profile: Profile) {
        console.log(accessToken);
        console.log(refreshTocken);
        console.log(profile);
        if (profile.emails && profile.emails.length > 0) {
          const email = profile.emails[0].value;
          console.log(email);
          return await this.authService.validateByEmail(email);
        } else {
          throw new Error('Email not found in profile');
        }
    }
}