import { UserLevel } from '../users/user-level.enum';
export interface JwtPayload {
    email: string;
    level: UserLevel;
    uuid: string;
}
