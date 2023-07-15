import { Store } from 'src/store/store.entity';
import { BaseEntity } from 'typeorm';
export declare class Product extends BaseEntity {
    id: string;
    name: string;
    sale: number;
    price: number;
    description: string;
    filenameSaved: string;
    imagesSaved: string;
    othersSaved: string;
    categorySaved: string;
    varianSaved: string;
    typesSaved: string;
    createdAt: Date;
    updatedAt: Date;
    store: Store;
    images: string[];
    others: string[];
    category: string[];
    varian: string[];
    types: string[];
    files: string[];
    convertStringToArray(): Promise<void>;
}
