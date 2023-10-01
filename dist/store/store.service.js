"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const app_utils_1 = require("../app.utils");
const store_entity_1 = require("./store.entity");
const users_service_1 = require("../users/users.service");
const uuid_1 = require("uuid");
const storage_service_1 = require("../commons/storage/storage.service");
const product_entity_1 = require("../product/product.entity");
let StoreService = class StoreService {
    constructor(storeRepository, userService, storageService, productRepository) {
        this.storeRepository = storeRepository;
        this.userService = userService;
        this.storageService = storageService;
        this.productRepository = productRepository;
    }
    async allStore(filterDto) {
        let request_store = this.storeRepository.createQueryBuilder('store')
            .innerJoinAndSelect('store.user', 'user');
        try {
            if (filterDto.active_on) {
                request_store = request_store.andWhere('store.active_on = :activeOn', {
                    activeOn: filterDto.active_on,
                });
            }
            if (filterDto.search) {
                request_store = request_store.andWhere('store.name ILIKE :searchTerm or store.address ILIKE :searchTerm or store.phone ILIKE :searchTerm or store.omset ILIKE :searchTerm or store.aspek ILIKE :searchTerm', { searchTerm: `%${filterDto.search}%` });
            }
            if (filterDto.id_mitra) {
                request_store = request_store.andWhere('user.id = :idMitra', { idMitra: filterDto.id_mitra });
            }
            const store = await request_store.getMany();
            for (let item of store) {
                item.url_image = `${process.env.LINK_GCP}/umkm/${item.active_on}/${item.mediaId}.png`;
                await item.convertStringToArray();
            }
            if (store.length == 0) {
                return app_utils_1.responseTemplate('400', "store doesn't exist", {}, true);
            }
            return app_utils_1.responseTemplate('200', 'success', store);
        }
        catch (err) {
            console.log('error query', err);
        }
    }
    async detailStore(id) {
        const store = await this.storeRepository.findOne({ where: { id: id } });
        if (!store) {
            throw new common_1.NotFoundException(`store with id ${id} not found`);
        }
        store.url_image = `${process.env.LINK_GCP}/umkm/${store.active_on}/${store.mediaId}.png`;
        await store.convertStringToArray();
        return app_utils_1.responseTemplate('200', 'success', store);
    }
    async uploadStore(uploadStore) {
        const { file, name, address, aspek, category, id_owner, phone, omset, mediaContact, mediaOrder, } = uploadStore;
        const owner = await this.userService.userDetail(id_owner);
        const store = new store_entity_1.Store();
        store.name = name || '';
        store.address = address || '';
        store.aspek = aspek || '';
        if (category && category.length != 0)
            store.katagoriSaved = JSON.stringify(category);
        store.user = owner;
        store.phone = phone || '';
        store.omset = omset || '';
        store.active_on = uploadStore.active_on;
        if (mediaContact && mediaContact.length != 0)
            store.mediaContact = JSON.stringify(mediaContact);
        if (mediaOrder && mediaContact.length != 0)
            store.mediaOrdered = JSON.stringify(mediaOrder);
        if (uploadStore.file) {
            store.mediaId = uuid_1.v4();
            await this.storageService.save(`umkm/${store.active_on}/${store.mediaId}`, file.mimetype, file.buffer, [{ mediaId: store.mediaId }]);
        }
        await store.convertStringToArray();
        try {
            await this.storeRepository.save(store);
        }
        catch (err) {
            console.log('error query', err);
        }
        return app_utils_1.responseTemplate('200', 'success', store);
    }
    async updateStore(updateStore, id) {
        const store = (await this.detailStore(id)).data;
        const owner = await this.userService.userDetail(updateStore.id_owner);
        if (updateStore.file) {
            try {
                await this.storageService.delete(`umkm/${store.active_on}/${store.mediaId}`);
            }
            catch (err) {
                console.log('error delete', err);
            }
            store.mediaId = uuid_1.v4();
            try {
                await this.storageService.save(`umkm/${store.active_on}/${store.mediaId}`, updateStore.file.mimetype, updateStore.file.buffer, [{ mediaId: store.mediaId }]);
            }
            catch (err) {
                console.log('error upload', err);
            }
        }
        store.name = updateStore.name;
        store.address = updateStore.address;
        store.aspek = updateStore.aspek;
        if (updateStore.category && updateStore.category.length != 0) {
            store.katagoriSaved = JSON.stringify(updateStore.category);
        }
        else {
            store.katagoriSaved = null;
        }
        store.phone = updateStore.phone;
        store.omset = updateStore.omset;
        if (updateStore.mediaContact && updateStore.mediaContact.length != 0) {
            store.mediaContact = JSON.stringify(updateStore.mediaContact);
        }
        else {
            store.mediaContact = null;
        }
        if (updateStore.mediaOrder && updateStore.mediaOrder.length != 0) {
            store.mediaOrdered = JSON.stringify(updateStore.mediaOrder);
        }
        else {
            store.mediaOrdered = null;
        }
        store.user = owner;
        await store.convertStringToArray();
        await this.storeRepository.save(store);
        return app_utils_1.responseTemplate('200', 'success', store);
    }
    async updateStatus(updateComment, id) {
        const store = (await this.detailStore(id)).data;
        if (!store.id) {
            return app_utils_1.responseTemplate('404', 'gagal', {});
        }
        try {
            store.status = String(updateComment.status) === 'true' ? true : false;
        }
        catch (err) {
            console.log('error parsing data', err);
        }
        try {
            await this.storeRepository.save(store);
        }
        catch (err) {
            console.log('error query', err);
        }
        return app_utils_1.responseTemplate('200', 'success', store);
    }
    async deleteStore(id) {
        let response = '';
        const store = (await this.detailStore(id)).data;
        const products = await this.productRepository.find({
            where: {
                store: {
                    id: id
                }
            },
            relations: ['store']
        });
        if (products.length > 0) {
            for (let product of products) {
                await this.productRepository.delete({ id: product.id });
            }
        }
        try {
            await this.storageService.delete(`umkm/${store.active_on}/${store.mediaId}`);
            response = `${store.createdAt}. ${store.mediaId} deleted`;
        }
        catch (e) {
            response = `${store.createdAt}. ${store.mediaId}, ${e.message}`;
        }
        await this.storeRepository.remove(store);
        return app_utils_1.responseTemplate('200', 'success', response);
    }
};
StoreService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(store_entity_1.Store)),
    __param(3, typeorm_1.InjectRepository(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService,
        storage_service_1.StorageService,
        typeorm_2.Repository])
], StoreService);
exports.StoreService = StoreService;
//# sourceMappingURL=store.service.js.map