import { ConfigType } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import jwtConfig from "../config/jwt.config";
import { AuthJwtPayload } from "../types/auth-jwtPayload";
import { Inject, Injectable } from "@nestjs/common";
import { AuthService } from "../auth.service";

@Injectable()
export class JwtStartegy extends PassportStrategy(Strategy) {
    constructor(@Inject(jwtConfig.KEY)
        private jwtCo: ConfigType<typeof jwtConfig>,
        private authService: AuthService
    ) {
        super ({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtCo.secret,
            ignoreExpiration: false,
        })
    }

    validate (payload: AuthJwtPayload) {
        const userId = payload.sub;
        return this.authService.validateJwtUser(userId);
    }
}