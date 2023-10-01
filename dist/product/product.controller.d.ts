/// <reference types="multer" />
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Request } from 'express';
import { FilterAllProducts } from './dto/filter-all.dto';
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
    allProduct(filterDto: FilterAllProducts): Promise<{
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
}
