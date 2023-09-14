/// <reference types="multer" />
import { UsersService } from './users.service';
import { Request, Response } from 'express';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { BumdesProfileDto } from './dto/bumdes-profile.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
export declare class UsersController {
    private userService;
    constructor(userService: UsersService);
    getIpAddress(request: Request): string;
    allUmkm(): Promise<{
        error: boolean;
        alerts: {
            code: string;
            message: string;
        };
        data: any;
    }>;
    allBumdes(request: Request): Promise<{
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
    seeFile(image: string, res: Response): void | Response<any, Record<string, any>>;
    updatePassword(body: UpdatePasswordDto, id: string): Promise<{
        error: boolean;
        alerts: {
            code: string;
            message: string;
        };
        data: any;
    }>;
}
