/// <reference types="multer" />
export declare class CreateNewsDto {
    title: string;
    posted_date: string;
    status: boolean;
    description: string;
    file: Express.Multer.File;
    active_on: string;
}
