/// <reference types="multer" />
export declare class CreateStoreDto {
    name: string;
    id_owner: string;
    address: string;
    phone: string;
    aspek: string;
    category: string[];
    link: string[];
    omset: string;
    file: Express.Multer.File;
}
