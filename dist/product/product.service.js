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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const product_entity_1 = require("./product.entity");
const typeorm_2 = require("typeorm");
const app_utils_1 = require("../app.utils");
const store_service_1 = require("../store/store.service");
const fs = require("fs");
const storage_service_1 = require("../commons/storage/storage.service");
const uuid_1 = require("uuid");
let ProductService = class ProductService {
    constructor(productRepository, storeService, storageService) {
        this.productRepository = productRepository;
        this.storeService = storeService;
        this.storageService = storageService;
    }
    async allProduct() {
        const products = await this.productRepository.find({
            relations: ['store'],
        });
        for (let item of products) {
            if (item.sale && item.price) {
                await item.countingDiscount();
            }
            await item.convertStringToArray();
            if (item.mediaIds && item.mediaIds.length > 0) {
                const urlImage = item.mediaIds.map(file => `${process.env.LINK_GCP}/products/${item.active_on}/${file}.png`);
                item.images = urlImage;
            }
        }
        if (products.length == 0) {
            return app_utils_1.responseTemplate('400', "Product doesn't exist", {}, true);
        }
        return app_utils_1.responseTemplate('200', 'success', products);
    }
    async detailProduct(id, url) {
        const product = await this.productRepository.findOne({ where: { id: id } });
        if (!product) {
            throw new common_1.NotFoundException(`Product with id ${id} not found`);
        }
        if (product.sale && product.price) {
            await product.countingDiscount();
        }
        await product.convertStringToArray();
        return app_utils_1.responseTemplate('200', 'success', product);
    }
    async saveProduct(uploadProduct) {
        const { category, description, id_umkm, name, price, others, sale, files, } = uploadProduct;
        const umkm = (await this.storeService.detailStore(id_umkm)).data;
        const product = new product_entity_1.Product();
        product.name = name;
        product.price = price;
        product.sale = sale;
        product.description = description;
        product.store = umkm;
        product.category = category;
        product.active_on = uploadProduct.active_on;
        product.othersSaved = JSON.parse(others);
        const medias = [];
        if (files && files.length > 0) {
            for (let file of files) {
                const mediaId = uuid_1.v4();
                try {
                    await this.storageService.save(`products/${product.active_on}/${mediaId}`, file.mimetype, file.buffer, [{ mediaId: mediaId }]);
                    medias.push(mediaId);
                }
                catch (err) {
                    console.log('error upload', err);
                }
            }
        }
        product.mediaId = JSON.stringify(medias);
        await product.convertStringToArray();
        await this.productRepository.save(product);
        return app_utils_1.responseTemplate('200', 'success', product);
    }
    async updateProduct(updateProduct, id) {
        const product = (await this.detailProduct(id)).data;
        await product.convertStringToArray();
        const { category, description, files, id_umkm, name, others, price, sale, } = updateProduct;
        const umkm = (await this.storeService.detailStore(id_umkm)).data;
        product.name = name;
        product.price = price;
        product.sale = sale;
        product.description = description;
        product.store = umkm;
        product.category = category;
        product.othersSaved = others;
        if (files && files.length != 0) {
            if (product.images && product.images.length != 0) {
                product.images.map(item => {
                    if (fs.existsSync(item)) {
                        fs.unlinkSync(item);
                    }
                });
            }
            const filename = files.map(item => item.filename);
            const image = files.map(item => item.path);
            product.filenameSaved = JSON.stringify(filename);
            product.imagesSaved = JSON.stringify(image);
        }
        else {
            product.filenameSaved = null;
            product.imagesSaved = null;
        }
        await this.productRepository.save(product);
        await product.convertStringToArray();
        return app_utils_1.responseTemplate('200', 'success', product);
    }
    async deleteProduct(id) {
        let response = [];
        const product = (await this.detailProduct(id)).data;
        await product.convertStringToArray();
        if (product.images && product.images.length != 0) {
            product.images.map(item => {
                try {
                    if (fs.existsSync(item)) {
                        console.log('masuk');
                        fs.unlinkSync(item);
                        response.push(`${product.createdAt}. ${item} deleted`);
                    }
                }
                catch (e) {
                    response.push(`${product.createdAt}. ${item}, ${e.message}`);
                }
            });
        }
        await this.productRepository.remove(product);
        return app_utils_1.responseTemplate('200', 'success', response);
    }
};
ProductService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        store_service_1.StoreService,
        storage_service_1.StorageService])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map