/// <reference types="multer" />
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Request, Response } from 'express';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    createProduct(files: Express.Multer.File[], uploadsDto: CreateProductDto): Promise<{
        error: boolean;
        alerts: {
            code: string;
            message: string;
        };
        data: any;
    }>;
    allProduct(request: Request): Promise<{
        error: boolean;
        alerts: {
            code: string;
            message: string;
        };
        data: any;
    }>;
    updateProduct(id: string, data: CreateProductDto, files: Express.Multer.File[]): Promise<{
        error: boolean;
        alerts: {
            code: string;
            message: string;
        };
        data: any;
    }>;
    detailProdcut(id: string, request: Request): Promise<{
        error: boolean;
        alerts: {
            code: string;
            message: string;
        };
        data: any;
    }>;
    deleteProduct(id: string): Promise<{
        error: boolean;
        alerts: {
            code: string;
            message: string;
        };
        data: any;
    }>;
    seeFile(image: string, res: Response): void | Response<any, Record<string, any>>;
}
