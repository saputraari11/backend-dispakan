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
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const platform_express_1 = require("@nestjs/platform-express");
const bumdes_profile_dto_1 = require("./dto/bumdes-profile.dto");
const os = require("os");
const dir = `${os.homedir()}/dispakan/assets/bumdes`;
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + path.basename(file.originalname));
    }
});
let UsersController = class UsersController {
    constructor(userService) {
        this.userService = userService;
    }
    getIpAddress(request) {
        const ipAddress = request.ip;
        return ipAddress;
    }
    async allUmkm() {
        const result = await this.userService.userUmkm();
        return result;
    }
    async allBumdes() {
        const result = await this.userService.userBumdes();
        return result;
    }
    async detailUmkm(id) {
        const result = await this.userService.userDetail(id);
        return app_utils_1.responseTemplate("200", "success", result);
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
    seeFile(image, res) {
        return res.sendFile(image, { root: dir });
    }
};
__decorate([
    common_1.Get("ip"),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", String)
], UsersController.prototype, "getIpAddress", null);
__decorate([
    common_1.Get("umkm"),
    swagger_1.ApiBearerAuth(),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "allUmkm", null);
__decorate([
    common_1.Get("bumdes"),
    swagger_1.ApiBearerAuth(),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "allBumdes", null);
__decorate([
    common_1.Get("umkm/:id"),
    swagger_1.ApiBearerAuth(),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "detailUmkm", null);
__decorate([
    common_1.Get("delete-umkm/:id"),
    swagger_1.ApiBearerAuth(),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deleteUmkm", null);
__decorate([
    common_1.Post("umkm/profil"),
    swagger_1.ApiBearerAuth(),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_profile_dto_1.UpdateProfileDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateProfilUmkm", null);
__decorate([
    common_1.Post("bumdes/profil"),
    swagger_1.ApiBearerAuth(),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiConsumes('multipart/form-data'),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('file', {
        storage: storage
    })),
    __param(0, common_1.Body()),
    __param(1, common_1.UploadedFile('file')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bumdes_profile_dto_1.BumdesProfileDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateProfilBumdes", null);
__decorate([
    common_1.Get('bumdes/profile/:img'),
    swagger_1.ApiBearerAuth(),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    __param(0, common_1.Param('img')), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "seeFile", null);
UsersController = __decorate([
    swagger_1.ApiTags('User'),
    common_1.Controller('user'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map