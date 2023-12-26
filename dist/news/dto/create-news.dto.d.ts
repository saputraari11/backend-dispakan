/// <reference types="multer" />
import { BaseDto } from '../../commons/base.dto';
export declare class CreateNewsDto extends BaseDto {
    title: string;
    posted_date: string;
    status: string | boolean;
    description: string;
    file: Express.Multer.File;
}
