import { Repository } from 'typeorm';
import { User } from './user.entity';
import { SignupCredentialsDto } from '../auth/dto/signup-credentials.dto';
export declare class UserRepository extends Repository<User> {
    signup(signupCredentialsDto: SignupCredentialsDto): Promise<User>;
    validateUserPassword(user_name: string, password: string): Promise<User>;
    hashPassword(password: string, salt: string): Promise<any>;
}
