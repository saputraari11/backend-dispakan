/// <reference types="multer" />
export declare class CreateProductDto {
    name: string;
    id_umkm: string;
    sale: number;
    description: string;
    status: boolean;
    price: number;
    category: string;
    active_on: string;
    others_description: string;
    files: Express.Multer.File[];
}
