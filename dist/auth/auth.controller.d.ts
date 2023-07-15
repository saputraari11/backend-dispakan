import { User } from '../users/user.entity';
import { AuthService } from './auth.service';
import { SignupCredentialsDto } from './dto/signup-credentials.dto';
import { SignInDto } from './dto/signin.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signin(signInCredentialsDto: SignInDto): Promise<{
        error: boolean;
        alerts: {
            code: string;
            message: string;
        };
        data: any;
    }>;
    signUp(signUpCredentialsDto: SignupCredentialsDto): Promise<User>;
    signUpUser(signUpCredentialsDto: SignupCredentialsDto): Promise<User>;
}
