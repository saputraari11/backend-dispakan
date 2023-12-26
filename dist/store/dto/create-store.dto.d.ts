/// <reference types="multer" />
import { BaseDto } from '../../commons/base.dto';
export declare class CreateStoreDto extends BaseDto {
    name: string;
    id_owner: string;
    address: string;
    phone: string;
    status: string | boolean;
    aspek: string;
    category: string[];
    mediaOrder: string[];
    mediaContact: string[];
    omset: string;
    file: Express.Multer.File;
}
