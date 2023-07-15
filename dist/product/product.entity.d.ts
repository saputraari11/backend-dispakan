import { Store } from 'src/store/store.entity';
import { BaseEntity } from 'typeorm';
export declare class Product extends BaseEntity {
    id: string;
    name: string;
    sale: number;
    price: number;
    description: string;
    image: string;
    loved: number;
    createdAt: Date;
    updatedAt: Date;
    store: Store;
}
