import { News } from '../news/news.entity';
import { BaseEntity } from 'typeorm';
export declare class Comment extends BaseEntity {
    id: string;
    name: string;
    description: string;
    periode: Date;
    is_proved: string;
    active_on: string;
    createdAt: Date;
    updatedAt: Date;
    news: News;
}
