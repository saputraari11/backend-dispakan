import { News } from "./news.entity";
import { Repository } from "typeorm";
import { CreateNewsDto } from "./dto/create-news.dto";
export declare class NewsService {
    private readonly newsRepository;
    constructor(newsRepository: Repository<News>);
    allNews(): Promise<{
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
