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
const filter_all_dto_1 = require("./dto/filter-all.dto");
const roles_decorator_1 = require("../auth/roles.decorator");
const user_level_enum_1 = require("../users/user-level.enum");
const roles_guard_1 = require("../auth/roles.guard");
const throttler_1 = require("@nestjs/throttler");
const update_news_dto_1 = require("./dto/update-news.dto");
let NewsController = class NewsController {
    constructor(newsService) {
        this.newsService = newsService;
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
    async detailNews(id) {
        const result = await this.newsService.detailNews(id);
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
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_all_dto_1.FilterAllNews]),
    __metadata("design:returntype", Promise)
], NewsController.prototype, "allNews", null);
__decorate([
    common_1.Post('upload'),
    swagger_1.ApiBearerAuth(),
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
    __metadata("design:paramtypes", [String, update_news_dto_1.UpdateNewsDto, Object]),
    __metadata("design:returntype", Promise)
], NewsController.prototype, "updateFile", null);
__decorate([
    common_1.Get('detail/:id'),
    swagger_1.ApiBearerAuth(),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NewsController.prototype, "detailNews", null);
__decorate([
    common_1.Get('delete/:id'),
    swagger_1.ApiBearerAuth(),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NewsController.prototype, "deleteNews", null);
NewsController = __decorate([
    swagger_1.ApiTags('News'),
    common_1.Controller('news'),
    common_1.UseGuards(passport_1.AuthGuard('jwt'), roles_guard_1.RolesGuard, throttler_1.ThrottlerGuard),
    roles_decorator_1.Roles(user_level_enum_1.UserLevel.BUMDES),
    __metadata("design:paramtypes", [news_service_1.NewsService])
], NewsController);
exports.NewsController = NewsController;
//# sourceMappingURL=news.controller.js.map