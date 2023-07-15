import { BaseEntity } from 'typeorm';
import { UserLevel } from './user-level.enum';
import { Store } from 'src/store/store.entity';
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
    filename: string;
    image: string;
    createdAt: Date;
    updatedAt: Date;
    store: Store[];
    validatePassword(password: string): Promise<boolean>;
}
