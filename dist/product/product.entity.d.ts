import { ClickProduct } from '../landing-page/click-product.entity';
import { LikeProduct } from '../landing-page/like-product.entity';
import { Store } from '../store/store.entity';
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
    category: string;
    mediaId: string;
    active_on: string;
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
    store: Store;
    like: LikeProduct[];
    click: ClickProduct[];
    images: string[];
    others_descriptions: string[];
    mediaIds: string[];
    price_discount: number;
    discount: number;
    jumlah_like: number;
    countingDiscount(): Promise<void>;
    convertStringToArray(): Promise<void>;
}
