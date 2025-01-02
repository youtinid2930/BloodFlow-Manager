import { ConfigType } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import jwtConfig from "../config/jwt.config";
import { AuthJwtPayload } from "../types/auth-jwtPayload";
import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import refreshJwtConfig from "../config/refresh-jwt.config";
import { Request } from "express";
import { AuthService } from "../auth.service";

@Injectable()
export class RefreshJwtStartegy extends PassportStrategy(Strategy, "refresh-jwt") {
    constructor(@Inject(refreshJwtConfig.KEY)
        private refreshJwtCo: ConfigType<typeof refreshJwtConfig>,
        private authService: AuthService,
    ) {
        super ({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: refreshJwtCo.secret,
            ignoreExpiration: false,
            passReqToCallback: true,
        })
    }

    validate (req: Request,  payload: AuthJwtPayload) {
        const refreshTocken = req.get('authorization')?.replace("Bearer", "").trim();
        console.log("refrech token after the replace: ", refreshTocken);
        const userId = payload.sub;
        if(!refreshTocken) {
            throw new UnauthorizedException("refresh Tocken Invalid");
        }
        console.log("after the fist validation");
        return this.authService.validateRefrechToken(userId, refreshTocken);
    }
}