import { News } from './news.entity';
import { Repository } from 'typeorm';
import { CreateNewsDto } from './dto/create-news.dto';
import { StorageService } from '../commons/storage/storage.service';
import { FilterAllNews } from './dto/filter-all.dto';
import { Comment } from '../comment/comment.entity';
import { UpdateNewsDto } from './dto/update-news.dto';
export declare class NewsService {
    private readonly newsRepository;
    private readonly commentRepository;
    private storageService;
    constructor(newsRepository: Repository<News>, commentRepository: Repository<Comment>, storageService: StorageService);
    allNews(filterAllNews: FilterAllNews): Promise<{
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
    updateNews(updateNews: UpdateNewsDto, id: string): Promise<{
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
