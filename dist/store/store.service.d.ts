import { Repository } from 'typeorm';
import { Store } from './store.entity';
import { CreateStoreDto } from './dto/create-store.dto';
import { UsersService } from '../users/users.service';
import { StorageService } from '../commons/storage/storage.service';
import { FilterStoreDto } from './dto/filter-all.dto';
import { Product } from '../product/product.entity';
import { UpdateStoreDto } from './dto/update-store.dto';
export declare class StoreService {
    private readonly storeRepository;
    private readonly userService;
    private readonly storageService;
    private readonly productRepository;
    constructor(storeRepository: Repository<Store>, userService: UsersService, storageService: StorageService, productRepository: Repository<Product>);
    allStore(filterDto: FilterStoreDto): Promise<{
        error: boolean;
        alerts: {
            code: string;
            message: string;
        };
        data: any;
    }>;
    detailStore(id: string): Promise<{
        error: boolean;
        alerts: {
            code: string;
            message: string;
        };
        data: any;
    }>;
    uploadStore(uploadStore: CreateStoreDto): Promise<{
        error: boolean;
        alerts: {
            code: string;
            message: string;
        };
        data: any;
    }>;
    updateStore(updateStore: UpdateStoreDto, id: string): Promise<{
        error: boolean;
        alerts: {
            code: string;
            message: string;
        };
        data: any;
    }>;
    deleteStore(id: string): Promise<{
        error: boolean;
        alerts: {
            code: string;
            message: string;
        };
        data: any;
    }>;
}
