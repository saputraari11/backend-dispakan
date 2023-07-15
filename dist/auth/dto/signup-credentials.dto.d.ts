import { UserLevel } from 'src/users/user-level.enum';
export declare class SignupCredentialsDto {
    name?: string;
    address?: string;
    phone?: string;
    email: string;
    password: string;
    level: UserLevel;
}
