import { JwtService } from '@nestjs/jwt';
import { UserLevel } from 'src/users/user-level.enum';
import { UserRepository } from 'src/users/user.repository';
import { User } from '../users/user.entity';
import { SignupCredentialsDto } from './dto/signup-credentials.dto';
import { ConfigService } from '@nestjs/config';
import { SignInDto } from './dto/signin.dto';
export declare class AuthService {
    private jwtService;
    private userRepository;
    private configService;
    constructor(jwtService: JwtService, userRepository: UserRepository, configService: ConfigService);
    private apiKeys;
    generateToken(user: User): {
        access_token: string;
    };
    signIn(userLogin: SignInDto): Promise<{
        error: boolean;
        alerts: {
            code: string;
            message: string;
        };
        data: any;
    }>;
    signUp(userRegister: SignupCredentialsDto, level?: UserLevel): Promise<User>;
    validate(username: string, password: string, active_on: string): Promise<User>;
    validateApiKey(apiKey: string): string;
}
