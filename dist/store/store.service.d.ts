import { Repository } from 'typeorm';
import { Store } from './store.entity';
import { CreateStoreDto } from './dto/create-store.dto';
import { UsersService } from 'src/users/users.service';
import { StorageService } from 'src/commons/storage/storage.service';
import { FilterStoreDto } from './dto/filter-all.dto';
import { UpdateStatusStore } from './dto/update-status.dto';
export declare class StoreService {
    private readonly storeRepository;
    private readonly userService;
    private readonly storageService;
    constructor(storeRepository: Repository<Store>, userService: UsersService, storageService: StorageService);
    allStore(filterDto: FilterStoreDto): Promise<{
        error: boolean;
        alerts: {
            code: string;
            message: string;
        };
        data: any;
    }>;
    detailStore(id: string, url?: string): Promise<{
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
    updateStore(updateStore: CreateStoreDto, id: string): Promise<{
        error: boolean;
        alerts: {
            code: string;
            message: string;
        };
        data: any;
    }>;
    updateStatus(updateComment: UpdateStatusStore, id: string): Promise<{
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
