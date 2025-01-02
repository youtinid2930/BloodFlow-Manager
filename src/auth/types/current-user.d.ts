import { Role } from "src/roles/enum/role.enum";

export type CurrentUser = {
    id: ObjectId,
    role: Role
}