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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const users_service_1 = require("./users.service");
const passport_1 = require("@nestjs/passport");
const update_profile_dto_1 = require("./dto/update-profile.dto");
const app_utils_1 = require("../app.utils");
const path = require("path");
const platform_express_1 = require("@nestjs/platform-express");
const bumdes_profile_dto_1 = require("./dto/bumdes-profile.dto");
const update_password_dto_1 = require("./dto/update-password.dto");
const update_status_dto_1 = require("./dto/update-status.dto");
const filter_all_dto_1 = require("./dto/filter-all.dto");
const roles_guard_1 = require("../auth/roles.guard");
const user_level_enum_1 = require("./user-level.enum");
const roles_decorator_1 = require("../auth/roles.decorator");
const throttler_1 = require("@nestjs/throttler");
let dir = `public/dispakan/assets/bumdes`;
dir = path.join(__dirname, '..', '..', '..', '..', '..', dir);
let UsersController = class UsersController {
    constructor(userService) {
        this.userService = userService;
    }
    async allUmkm(filterAllUmkm) {
        const result = await this.userService.userUmkm(filterAllUmkm);
        return result;
    }
    async allBumdes(filterAllUmkm) {
        const result = await this.userService.userBumdes(filterAllUmkm);
        return result;
    }
    async detailUser(id, request) {
        const protocol = request.protocol;
        const hostname = request.headers.host;
        const url = `${protocol}://${hostname}/bumdes/profile/image`;
        const result = await this.userService.userDetail(id, url);
        return app_utils_1.responseTemplate('200', 'success', result);
    }
    async deleteUmkm(id) {
        const result = await this.userService.deleteUmkm(id);
        return result;
    }
    async updateProfilUmkm(body) {
        const result = await this.userService.updateProfile(body);
        return result;
    }
    async updateProfilBumdes(body, file) {
        body.file = file;
        const result = await this.userService.updateBumdes(body);
        return result;
    }
    async updatePassword(body, id) {
        body.id_user = id;
        const result = await this.userService.updatePassword(body);
        return result;
    }
    async updateStatus(body, id) {
        const result = await this.userService.updateStatus(body, id);
        return result;
    }
};
__decorate([
    common_1.Get('umkm'),
    swagger_1.ApiBearerAuth(),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_all_dto_1.FilterUmkmDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "allUmkm", null);
__decorate([
    common_1.Get('bumdes'),
    swagger_1.ApiBearerAuth(),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_all_dto_1.FilterUmkmDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "allBumdes", null);
__decorate([
    common_1.Get('detail/:id'),
    swagger_1.ApiBearerAuth(),
    roles_decorator_1.Roles(user_level_enum_1.UserLevel.BUMDES, user_level_enum_1.UserLevel.UMKM),
    __param(0, common_1.Param('id')), __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "detailUser", null);
__decorate([
    common_1.Get('delete-umkm/:id'),
    swagger_1.ApiBearerAuth(),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deleteUmkm", null);
__decorate([
    common_1.Post('umkm/profil'),
    swagger_1.ApiBearerAuth(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_profile_dto_1.UpdateProfileDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateProfilUmkm", null);
__decorate([
    common_1.Post('bumdes/profil'),
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
    __metadata("design:paramtypes", [bumdes_profile_dto_1.BumdesProfileDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateProfilBumdes", null);
__decorate([
    common_1.Post('update/password/:id'),
    swagger_1.ApiBearerAuth(),
    __param(0, common_1.Body()),
    __param(1, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_password_dto_1.UpdatePasswordDto, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updatePassword", null);
__decorate([
    common_1.Post('update/status/:id'),
    swagger_1.ApiBearerAuth(),
    __param(0, common_1.Body()), __param(1, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_status_dto_1.UpdateStatusDto, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateStatus", null);
UsersController = __decorate([
    swagger_1.ApiTags('User'),
    common_1.Controller('user'),
    common_1.UseGuards(passport_1.AuthGuard('jwt'), roles_guard_1.RolesGuard, throttler_1.ThrottlerGuard),
    roles_decorator_1.Roles(user_level_enum_1.UserLevel.BUMDES),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map