/// <reference types="multer" />
export declare class CreateStoreDto {
    name: string;
    id_owner: string;
    address: string;
    phone: string;
    status: boolean;
    aspek: string;
    category: string[];
    mediaOrder: string[];
    mediaContact: string[];
    omset: string;
    active_on: string;
    file: Express.Multer.File;
}
