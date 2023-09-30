import { News } from './news.entity';
import { Repository } from 'typeorm';
import { CreateNewsDto } from './dto/create-news.dto';
import { StorageService } from 'src/commons/storage/storage.service';
import { FilterAllNews } from './dto/filter-all.dto';
export declare class NewsService {
    private readonly newsRepository;
    private storageService;
    constructor(newsRepository: Repository<News>, storageService: StorageService);
    allNews(filterAllNews: FilterAllNews): Promise<{
        error: boolean;
        alerts: {
            code: string;
            message: string;
        };
        data: any;
    }>;
    detailNews(id: string, url?: string): Promise<{
        error: boolean;
        alerts: {
            code: string;
            message: string;
        };
        data: any;
    }>;
    uploadNews(uploadNews: CreateNewsDto): Promise<{
        error: boolean;
        alerts: {
            code: string;
            message: string;
        };
        data: any;
    }>;
    updateNews(updateNews: CreateNewsDto, id: string): Promise<{
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
