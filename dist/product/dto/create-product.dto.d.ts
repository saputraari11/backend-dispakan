/// <reference types="multer" />
export declare class CreateProductDto {
    name: string;
    id_umkm: string;
    sale: number;
    description: string;
    price: number;
    category: string;
    active_on: string;
    others: string;
    files: Express.Multer.File[];
}
