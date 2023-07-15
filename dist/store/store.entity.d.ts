import { Product } from 'src/product/product.entity';
import { User } from 'src/users/user.entity';
import { BaseEntity } from 'typeorm';
export declare class Store extends BaseEntity {
    id: string;
    name: string;
    address: string;
    phone: string;
    linkSaved: string;
    omset: string;
    filename: string;
    image: string;
    katagoriSaved: string;
    aspek: string;
    createdAt: Date;
    updatedAt: Date;
    user: User;
    product: Product[];
    link: any[];
    katagori: any[];
    convertStringToArray(): Promise<void>;
}
