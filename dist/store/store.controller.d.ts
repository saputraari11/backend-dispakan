/// <reference types="multer" />
import { Request, Response } from 'express';
import { StoreService } from './store.service';
import { CreateStoreDto } from './dto/create-store.dto';
export declare class StoreController {
    private storeService;
    constructor(storeService: StoreService);
    allStore(request: Request): Promise<{
        error: boolean;
        alerts: {
            code: string;
            message: string;
        };
        data: any;
    }>;
    uploadFile(data: CreateStoreDto, file: Express.Multer.File): Promise<{
        error: boolean;
        alerts: {
            code: string;
            message: string;
        };
        data: any;
    }>;
    updateFile(id: string, data: CreateStoreDto, file: Express.Multer.File): Promise<{
        error: boolean;
        alerts: {
            code: string;
            message: string;
        };
        data: any;
    }>;
    detailStore(id: string, request: Request): Promise<{
        error: boolean;
        alerts: {
            code: string;
            message: string;
        };
        data: any;
    }>;
    deleteStore(id: string): Promise<{
        error: boolean;
        alerts: {
            code: string;
            message: string;
        };
        data: any;
    }>;
    seeFile(image: string, res: Response): void | Response<any, Record<string, any>>;
}
