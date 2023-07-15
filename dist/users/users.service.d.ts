import { UserRepository } from './user.repository';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { BumdesProfileDto } from './dto/bumdes-profile.dto';
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
    userBumdes(): Promise<{
        error: boolean;
        alerts: {
            code: string;
            message: string;
        };
        data: any;
    }>;
    userDetail(id: string): Promise<import("./user.entity").User>;
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
    deleteUmkm(id: string): Promise<{
        error: boolean;
        alerts: {
            code: string;
            message: string;
        };
        data: any;
    }>;
}
