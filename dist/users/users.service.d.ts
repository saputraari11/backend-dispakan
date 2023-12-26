import { UserRepository } from './user.repository';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { BumdesProfileDto } from './dto/bumdes-profile.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { StorageService } from '../commons/storage/storage.service';
import { User } from './user.entity';
import { UpdateStatusDto } from './dto/update-status.dto';
import { FilterUmkmDto } from './dto/filter-all.dto';
export declare class UsersService {
    private userRepository;
    private storageService;
    constructor(userRepository: UserRepository, storageService: StorageService);
    userUmkm(filterUmkm: FilterUmkmDto): Promise<{
        error: boolean;
        alerts: {
            code: string;
            message: string;
        };
        data: any;
    }>;
    userBumdes(filterUmkm: FilterUmkmDto): Promise<{
        error: boolean;
        alerts: {
            code: string;
            message: string;
        };
        data: any;
    }>;
    userDetail(id: string, url?: string): Promise<User>;
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
    updateStatus(updateStatus: UpdateStatusDto, id: string): Promise<{
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
