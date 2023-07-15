import { BaseEntity } from 'typeorm';
export declare class News extends BaseEntity {
    id: string;
    title: string;
    posted_date: Date;
    filename: string;
    image: string;
    status: boolean;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}
