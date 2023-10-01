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
exports.NewsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const platform_express_1 = require("@nestjs/platform-express");
const create_news_dto_1 = require("./dto/create-news.dto");
const news_service_1 = require("./news.service");
const passport_1 = require("@nestjs/passport");
const storage_file_1 = require("../commons/storage/storage-file");
const storage_service_1 = require("../commons/storage/storage.service");
const filter_all_dto_1 = require("./dto/filter-all.dto");
let NewsController = class NewsController {
    constructor(newsService, storageService) {
        this.newsService = newsService;
        this.storageService = storageService;
    }
    async allNews(filterDto) {
        const result = await this.newsService.allNews(filterDto);
        return result;
    }
    async uploadFile(data, file) {
        data.file = file;
        const result = await this.newsService.uploadNews(data);
        return result;
    }
    async updateFile(id, data, file) {
        data.file = file;
        const result = await this.newsService.updateNews(data, id);
        return result;
    }
    async detailNews(id, request) {
        const protocol = request.protocol;
        const hostname = request.headers.host;
        const url = `${protocol}://${hostname}/news/image`;
        const result = await this.newsService.detailNews(id, url);
        return result;
    }
    async deleteNews(id) {
        const result = await this.newsService.deleteNews(id);
        return result;
    }
};
__decorate([
    common_1.Get(),
    swagger_1.ApiBearerAuth(),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_all_dto_1.FilterAllNews]),
    __metadata("design:returntype", Promise)
], NewsController.prototype, "allNews", null);
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
    __metadata("design:paramtypes", [create_news_dto_1.CreateNewsDto, Object]),
    __metadata("design:returntype", Promise)
], NewsController.prototype, "uploadFile", null);
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
    __metadata("design:paramtypes", [String, create_news_dto_1.CreateNewsDto, Object]),
    __metadata("design:returntype", Promise)
], NewsController.prototype, "updateFile", null);
__decorate([
    common_1.Get('detail/:id'),
    swagger_1.ApiBearerAuth(),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    __param(0, common_1.Param('id')), __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], NewsController.prototype, "detailNews", null);
__decorate([
    common_1.Get('delete/:id'),
    swagger_1.ApiBearerAuth(),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NewsController.prototype, "deleteNews", null);
NewsController = __decorate([
    swagger_1.ApiTags('News'),
    common_1.Controller('news'),
    __metadata("design:paramtypes", [news_service_1.NewsService,
        storage_service_1.StorageService])
], NewsController);
exports.NewsController = NewsController;
//# sourceMappingURL=news.controller.js.map