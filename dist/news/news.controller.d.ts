/// <reference types="multer" />
import { CreateNewsDto } from './dto/create-news.dto';
import { NewsService } from './news.service';
import { FilterAllNews } from './dto/filter-all.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
export declare class NewsController {
    private newsService;
    constructor(newsService: NewsService);
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
    updateFile(id: string, data: UpdateNewsDto, file: Express.Multer.File): Promise<{
        error: boolean;
        alerts: {
            code: string;
            message: string;
        };
        data: any;
    }>;
    detailNews(id: string): Promise<{
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
