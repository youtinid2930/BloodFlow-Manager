import { Inject, Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { AuthService } from "../auth.service";
import { User } from "../../users/schemas/users.schema";
import { UsersService } from "../../users/users.service";

@Injectable()
export class SessionSerializer extends PassportSerializer {
    constructor(
        private readonly userService: UsersService,
    ) {
        super();
    }

    serializeUser(user: User, done: Function) {
        console.log("inside the serialize");
        done(null, user);
    }

    async deserializeUser(payload: any, done: Function) {
        const user = await this.userService.findOne(payload.id);
        console.log("inside the deserializeUser", user);
        return user ? done(null, user) : done(null, null);
    }
}