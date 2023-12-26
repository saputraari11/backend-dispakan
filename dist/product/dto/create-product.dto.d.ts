/// <reference types="multer" />
import { BaseDto } from '../../commons/base.dto';
export declare class CreateProductDto extends BaseDto {
    name: string;
    id_umkm: string;
    sale: number;
    description: string;
    status: boolean;
    price: number;
    category: string;
    others_description: string;
    files: Express.Multer.File[];
}
