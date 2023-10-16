import { User } from '../users/user.entity';
import { AuthService } from './auth.service';
import { SignupCredentialsDto } from './dto/signup-credentials.dto';
import { SignInDto } from './dto/signin.dto';
import { Request } from 'express';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signin(signInCredentialsDto: SignInDto): Promise<any>;
    signUp(signUpCredentialsDto: SignupCredentialsDto): Promise<User>;
    signUpUser(signUpCredentialsDto: SignupCredentialsDto, request: Request): Promise<User>;
}
