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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_repository_1 = require("./user.repository");
const app_utils_1 = require("../app.utils");
const user_level_enum_1 = require("./user-level.enum");
const fs = require("fs");
let UsersService = class UsersService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async userUmkm() {
        const user = await this.userRepository.find({
            where: {
                level: user_level_enum_1.UserLevel.UMKM,
            },
        });
        return app_utils_1.responseTemplate('200', 'success', user);
    }
    async userBumdes(url) {
        const user = await this.userRepository.find({
            where: {
                level: user_level_enum_1.UserLevel.BUMDES,
            },
        });
        user.map(item => item.url_image = `${url}/${item.filename}`);
        return app_utils_1.responseTemplate('200', 'success', user);
    }
    async userDetail(id, url) {
        const user = await this.userRepository.findOne({
            where: {
                id: id,
            },
        });
        user.url_image = `${url}/${user.filename}`;
        if (!user) {
            throw new common_1.NotFoundException(`User with id ${id} not Found!`);
        }
        return user;
    }
    async updateProfile(updateProfile) {
        const user = await this.userDetail(updateProfile.id_owner_umkm);
        if (updateProfile.name)
            user.name = updateProfile.name;
        if (updateProfile.phone)
            user.phone = updateProfile.phone;
        if (updateProfile.address)
            user.address = updateProfile.address;
        user.status = updateProfile.status;
        await this.userRepository.save(user);
        return app_utils_1.responseTemplate('200', 'success', user);
    }
    async updateBumdes(updateProfile) {
        const user = await this.userDetail(updateProfile.id_bumdes_umkm);
        if (updateProfile.name)
            user.name = updateProfile.name;
        if (updateProfile.phone)
            user.phone = updateProfile.phone;
        if (updateProfile.address)
            user.address = updateProfile.address;
        if (updateProfile.status)
            user.status = updateProfile.status;
        if (updateProfile.file) {
            if (fs.existsSync(user.image)) {
                fs.unlinkSync(user.image);
            }
            user.filename = updateProfile.file.filename;
            user.image = updateProfile.file.path;
        }
        await this.userRepository.save(user);
        return app_utils_1.responseTemplate('200', 'success', user);
    }
    async updatePassword(updatePassword) {
        const user = await this.userDetail(updatePassword.id_user);
        const isValid = await user.validatePassword(updatePassword.old_password);
        if (!isValid) {
            return app_utils_1.responseTemplate('400', 'Password is Wrong!', [], true);
        }
        const newPassword = await this.userRepository.hashPassword(updatePassword.new_password, user.salt);
        user.password = newPassword;
        await this.userRepository.save(user);
        return app_utils_1.responseTemplate('200', 'success', user);
    }
    async deleteUmkm(id) {
        const user = await this.userDetail(id);
        await this.userRepository.remove(user);
        return app_utils_1.responseTemplate('200', 'success', {});
    }
};
UsersService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(user_repository_1.UserRepository)),
    __metadata("design:paramtypes", [user_repository_1.UserRepository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map