import { Product } from '../product/product.entity';
import { User } from '../users/user.entity';
import { BaseEntity } from 'typeorm';
export declare class Store extends BaseEntity {
    id: string;
    name: string;
    address: string;
    phone: string;
    mediaOrdered: string;
    mediaContact: string;
    omset: string;
    filename: string;
    image: string;
    katagoriSaved: string;
    aspek: string;
    mediaId: string;
    active_on: string;
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
    user: User;
    product: Product[];
    media_ordered: any[];
    media_contact: any[];
    katagori_umkm: any[];
    url_image: string;
    convertStringToArray(): Promise<void>;
}
