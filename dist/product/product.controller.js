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
exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const product_service_1 = require("./product.service");
const passport_1 = require("@nestjs/passport");
const platform_express_1 = require("@nestjs/platform-express");
const create_product_dto_1 = require("./dto/create-product.dto");
const filter_all_dto_1 = require("./dto/filter-all.dto");
const roles_guard_1 = require("../auth/roles.guard");
const user_level_enum_1 = require("../users/user-level.enum");
const roles_decorator_1 = require("../auth/roles.decorator");
const throttler_1 = require("@nestjs/throttler");
const update_product_dto_1 = require("./dto/update-product.dto");
let ProductController = class ProductController {
    constructor(productService) {
        this.productService = productService;
    }
    createProduct(files, uploadsDto) {
        uploadsDto.files = files;
        return this.productService.saveProduct(uploadsDto);
    }
    async allProduct(filterDto) {
        const result = await this.productService.allProduct(filterDto);
        return result;
    }
    async updateProduct(id, data, files) {
        data.files = files;
        const result = await this.productService.updateProduct(data, id);
        return result;
    }
    async detailProdcut(id, request) {
        const result = await this.productService.detailProduct(id);
        return result;
    }
    async deleteProduct(id) {
        const result = await this.productService.deleteProduct(id);
        return result;
    }
};
__decorate([
    common_1.Post('upload'),
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiConsumes('multipart/form-data'),
    common_1.UseGuards(passport_1.AuthGuard('jwt'), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles(user_level_enum_1.UserLevel.UMKM),
    common_1.UseInterceptors(platform_express_1.FilesInterceptor('files', 24, {
        limits: {
            files: 24,
            fileSize: 1024 * 1024,
        },
    })),
    __param(0, common_1.UploadedFiles()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, create_product_dto_1.CreateProductDto]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "createProduct", null);
__decorate([
    common_1.Get(),
    swagger_1.ApiBearerAuth(),
    common_1.UseGuards(passport_1.AuthGuard('jwt'), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles(user_level_enum_1.UserLevel.BUMDES, user_level_enum_1.UserLevel.UMKM),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_all_dto_1.FilterAllProducts]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "allProduct", null);
__decorate([
    common_1.Post('update/:id'),
    swagger_1.ApiBearerAuth(),
    common_1.UseGuards(passport_1.AuthGuard('jwt'), roles_guard_1.RolesGuard, throttler_1.ThrottlerGuard),
    roles_decorator_1.Roles(user_level_enum_1.UserLevel.UMKM),
    swagger_1.ApiConsumes('multipart/form-data'),
    common_1.UseInterceptors(platform_express_1.FilesInterceptor('files', 24, {
        limits: {
            files: 24,
            fileSize: 1024 * 1024,
        },
    })),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Body()),
    __param(2, common_1.UploadedFiles()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_product_dto_1.UpdateProductDto, Array]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "updateProduct", null);
__decorate([
    common_1.Get('detail/:id'),
    swagger_1.ApiBearerAuth(),
    common_1.UseGuards(passport_1.AuthGuard('jwt'), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles(user_level_enum_1.UserLevel.BUMDES, user_level_enum_1.UserLevel.UMKM),
    __param(0, common_1.Param('id')), __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "detailProdcut", null);
__decorate([
    common_1.Get('delete/:id'),
    swagger_1.ApiBearerAuth(),
    common_1.UseGuards(passport_1.AuthGuard('jwt'), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles(user_level_enum_1.UserLevel.UMKM),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "deleteProduct", null);
ProductController = __decorate([
    swagger_1.ApiTags('Product UMKM'),
    common_1.Controller('product'),
    common_1.UseGuards(passport_1.AuthGuard('jwt'), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles(user_level_enum_1.UserLevel.BUMDES),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], ProductController);
exports.ProductController = ProductController;
//# sourceMappingURL=product.controller.js.map