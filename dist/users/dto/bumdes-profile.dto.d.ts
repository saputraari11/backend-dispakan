/// <reference types="multer" />
export declare class BumdesProfileDto {
    id_bumdes_umkm: string;
    name?: string;
    address?: string;
    phone?: string;
    status?: string;
    file: Express.Multer.File;
}
