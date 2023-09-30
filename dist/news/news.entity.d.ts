import { Comment } from 'src/comment/comment.entity';
import { BaseEntity } from 'typeorm';
export declare class News extends BaseEntity {
    id: string;
    title: string;
    posted_date: Date;
    filename: string;
    image: string;
    status: boolean;
    description: string;
    active_on: string;
    mediaId: string;
    createdAt: Date;
    updatedAt: Date;
    comments: Comment[];
    url_image: string;
}
