/// <reference types="multer" />
import { CreateNewsDto } from './dto/create-news.dto';
import { NewsService } from './news.service';
import { Request, Response } from 'express';
export declare class NewsController {
    private newsService;
    constructor(newsService: NewsService);
    allNews(request: Request): Promise<{
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
    seeFile(image: string, res: Response): void | Response<any, Record<string, any>>;
}
