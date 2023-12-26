import { BaseEntity } from 'typeorm';
import { UserLevel } from './user-level.enum';
import { Store } from '../store/store.entity';
export declare class User extends BaseEntity {
    id: string;
    name: string;
    email: string;
    password: string;
    salt: string;
    level: UserLevel;
    phone: string;
    address: string;
    status: boolean;
    createdBy: string;
    filename: string;
    image: string;
    mediaId: string;
    createdAt: Date;
    updatedAt: Date;
    store: Store[];
    active_on: string;
    url_image: string;
    validatePassword(password: string): Promise<boolean>;
}
