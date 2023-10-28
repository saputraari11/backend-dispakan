import { BaseDto } from 'src/commons/base.dto';
import { UserLevel } from 'src/users/user-level.enum';
export declare class SignupCredentialsDto extends BaseDto {
    name?: string;
    address?: string;
    phone?: string;
    email: string;
    password: string;
    level: UserLevel;
    createdBy: any;
}
