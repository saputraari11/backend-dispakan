/// <reference types="multer" />
import { UsersService } from './users.service';
import { Request } from 'express';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { BumdesProfileDto } from './dto/bumdes-profile.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { FilterUmkmDto } from './dto/filter-all.dto';
export declare class UsersController {
    private userService;
    constructor(userService: UsersService);
    allUmkm(filterAllUmkm: FilterUmkmDto): Promise<{
        error: boolean;
        alerts: {
            code: string;
            message: string;
        };
        data: any;
    }>;
    allBumdes(filterAllUmkm: FilterUmkmDto): Promise<{
        error: boolean;
        alerts: {
            code: string;
            message: string;
        };
        data: any;
    }>;
    detailUser(id: string, request: Request): Promise<{
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
    updateProfilUmkm(body: UpdateProfileDto): Promise<{
        error: boolean;
        alerts: {
            code: string;
            message: string;
        };
        data: any;
    }>;
    updateProfilBumdes(body: BumdesProfileDto, file: Express.Multer.File): Promise<{
        error: boolean;
        alerts: {
            code: string;
            message: string;
        };
        data: any;
    }>;
    updatePassword(body: UpdatePasswordDto, id: string): Promise<{
        error: boolean;
        alerts: {
            code: string;
            message: string;
        };
        data: any;
    }>;
    updateStatus(body: UpdateStatusDto, id: string): Promise<{
        error: boolean;
        alerts: {
            code: string;
            message: string;
        };
        data: any;
    }>;
}
