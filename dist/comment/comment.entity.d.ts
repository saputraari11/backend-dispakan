import { BaseEntity } from 'typeorm';
export declare class Comment extends BaseEntity {
    id: string;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}
