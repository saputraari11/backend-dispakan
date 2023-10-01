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
exports.StoreController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const platform_express_1 = require("@nestjs/platform-express");
const passport_1 = require("@nestjs/passport");
const store_service_1 = require("./store.service");
const create_store_dto_1 = require("./dto/create-store.dto");
const app_utils_1 = require("../app.utils");
const filter_all_dto_1 = require("./dto/filter-all.dto");
let StoreController = class StoreController {
    constructor(storeService) {
        this.storeService = storeService;
    }
    async allStore(request) {
        const result = await this.storeService.allStore(request);
        return result;
    }
    async uploadFile(data, file) {
        data.file = file;
        const result = await this.storeService.uploadStore(data);
        return result;
    }
    async updateFile(id, data, file) {
        data.file = file;
        const result = await this.storeService.updateStore(data, id);
        return result;
    }
    async updateFileStatus(id, data, file) {
        data.file = file;
        const result = await this.storeService.updateStore(data, id);
        return result;
    }
    async detailStore(id) {
        const result = await this.storeService.detailStore(id);
        return result;
    }
    async deleteStore(id) {
        const result = await this.storeService.deleteStore(id);
        return result;
    }
};
__decorate([
    common_1.Get(),
    swagger_1.ApiBearerAuth(),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_all_dto_1.FilterStoreDto]),
    __metadata("design:returntype", Promise)
], StoreController.prototype, "allStore", null);
__decorate([
    common_1.Post('upload'),
    swagger_1.ApiBearerAuth(),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiConsumes('multipart/form-data'),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('file', {
        limits: {
            files: 1,
            fileSize: 1024 * 1024,
        },
    })),
    __param(0, common_1.Body()),
    __param(1, common_1.UploadedFile('file')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_store_dto_1.CreateStoreDto, Object]),
    __metadata("design:returntype", Promise)
], StoreController.prototype, "uploadFile", null);
__decorate([
    common_1.Post('update/:id'),
    swagger_1.ApiBearerAuth(),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiConsumes('multipart/form-data'),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('file', {
        limits: {
            files: 1,
            fileSize: 1024 * 1024,
        },
    })),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Body()),
    __param(2, common_1.UploadedFile('file')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_store_dto_1.CreateStoreDto, Object]),
    __metadata("design:returntype", Promise)
], StoreController.prototype, "updateFile", null);
__decorate([
    common_1.Post('update/status/:id'),
    swagger_1.ApiBearerAuth(),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiConsumes('multipart/form-data'),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('file', {
        limits: {
            files: 1,
            fileSize: 1024 * 1024,
        },
    })),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Body()),
    __param(2, common_1.UploadedFile('file')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_store_dto_1.CreateStoreDto, Object]),
    __metadata("design:returntype", Promise)
], StoreController.prototype, "updateFileStatus", null);
__decorate([
    common_1.Get('detail/:id'),
    swagger_1.ApiBearerAuth(),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StoreController.prototype, "detailStore", null);
__decorate([
    common_1.Get('delete/:id'),
    swagger_1.ApiBearerAuth(),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StoreController.prototype, "deleteStore", null);
StoreController = __decorate([
    swagger_1.ApiTags('UMKM'),
    common_1.Controller('store'),
    __metadata("design:paramtypes", [store_service_1.StoreService])
], StoreController);
exports.StoreController = StoreController;
//# sourceMappingURL=store.controller.js.map