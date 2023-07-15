/// <reference types="multer" />
import { UsersService } from './users.service';
import { Request, Response } from 'express';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { BumdesProfileDto } from './dto/bumdes-profile.dto';
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
    allBumdes(): Promise<{
        error: boolean;
        alerts: {
            code: string;
            message: string;
        };
        data: any;
    }>;
    detailUmkm(id: string): Promise<{
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
    seeFile(image: string, res: Response): void;
}
