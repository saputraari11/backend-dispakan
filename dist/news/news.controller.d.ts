/// <reference types="multer" />
import { CreateNewsDto } from './dto/create-news.dto';
import { NewsService } from './news.service';
import { Request } from 'express';
import { StorageService } from 'src/commons/storage/storage.service';
import { FilterAllNews } from './dto/filter-all.dto';
export declare class NewsController {
    private newsService;
    private storageService;
    constructor(newsService: NewsService, storageService: StorageService);
    allNews(filterDto: FilterAllNews): Promise<{
        error: boolean;
        alerts: {
            code: string;
            message: string;
        };
        data: any;
    }>;
    uploadFile(data: CreateNewsDto, file: Express.Multer.File): Promise<{
        error: boolean;
        alerts: {
            code: string;
            message: string;
        };
        data: any;
    }>;
    updateFile(id: string, data: CreateNewsDto, file: Express.Multer.File): Promise<{
        error: boolean;
        alerts: {
            code: string;
            message: string;
        };
        data: any;
    }>;
    detailNews(id: string, request: Request): Promise<{
        error: boolean;
        alerts: {
            code: string;
            message: string;
        };
        data: any;
    }>;
    deleteNews(id: string): Promise<{
        error: boolean;
        alerts: {
            code: string;
            message: string;
        };
        data: any;
    }>;
}
