import { UserRepository } from './user.repository';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { BumdesProfileDto } from './dto/bumdes-profile.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
export declare class UsersService {
    private userRepository;
    constructor(userRepository: UserRepository);
    userUmkm(): Promise<{
        error: boolean;
        alerts: {
            code: string;
            message: string;
        };
        data: any;
    }>;
    userBumdes(url: string): Promise<{
        error: boolean;
        alerts: {
            code: string;
            message: string;
        };
        data: any;
    }>;
    userDetail(id: string, url?: string): Promise<import("./user.entity").User>;
    updateProfile(updateProfile: UpdateProfileDto): Promise<{
        error: boolean;
        alerts: {
            code: string;
            message: string;
        };
        data: any;
    }>;
    updateBumdes(updateProfile: BumdesProfileDto): Promise<{
        error: boolean;
        alerts: {
            code: string;
            message: string;
        };
        data: any;
    }>;
    updatePassword(updatePassword: UpdatePasswordDto): Promise<{
        error: boolean;
        alerts: {
            code: string;
            message: string;
        };
        data: any;
    }>;
    deleteUmkm(id: string): Promise<{
        error: boolean;
        alerts: {
            code: string;
            message: string;
        };
        data: any;
    }>;
}
