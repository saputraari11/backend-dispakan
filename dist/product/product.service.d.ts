import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { StoreService } from '../store/store.service';
import { StorageService } from '../commons/storage/storage.service';
import { FilterAllProducts } from './dto/filter-all.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductService {
    private readonly productRepository;
    private readonly storeService;
    private readonly storageService;
    constructor(productRepository: Repository<Product>, storeService: StoreService, storageService: StorageService);
    allProduct(filterAllProducts: FilterAllProducts): Promise<{
        error: boolean;
        alerts: {
            code: string;
            message: string;
        };
        data: any;
    }>;
    detailProduct(id: string): Promise<{
        error: boolean;
        alerts: {
            code: string;
            message: string;
        };
        data: any;
    }>;
    saveProduct(uploadProduct: CreateProductDto): Promise<{
        error: boolean;
        alerts: {
            code: string;
            message: string;
        };
        data: any;
    }>;
    updateProduct(updateProduct: UpdateProductDto, id: string): Promise<{
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
