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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const user_level_enum_1 = require("../users/user-level.enum");
const user_repository_1 = require("../users/user.repository");
const user_entity_1 = require("../users/user.entity");
const config_1 = require("@nestjs/config");
const app_utils_1 = require("../app.utils");
let AuthService = class AuthService {
    constructor(jwtService, userRepository, configService) {
        this.jwtService = jwtService;
        this.userRepository = userRepository;
        this.configService = configService;
        this.apiKeys = ['admin2023'];
    }
    generateToken(user) {
        const payload = {
            email: user.email,
            level: user.level,
            uuid: user.id,
        };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
    async signIn(userLogin) {
        const user = await this.validate(userLogin.email, userLogin.password, userLogin.active_on);
        if (!user) {
            return app_utils_1.responseTemplate('400', 'Email or Password is not found!', {}, true);
        }
        const token = this.generateToken(user);
        const data = Object.assign({ user }, token);
        return app_utils_1.responseTemplate('200', 'success', data);
    }
    async signUp(userRegister, level = user_level_enum_1.UserLevel.BUMDES) {
        const userExist = await user_entity_1.User.findOne({
            where: { email: userRegister.email, active_on: userRegister.active_on },
        });
        let user = new user_entity_1.User();
        userRegister.level = level;
        if (userExist) {
            throw new common_1.ConflictException('User is Already Exist!');
        }
        try {
            user = await this.userRepository.signup(userRegister);
        }
        catch (err) {
            console.log('error query', err);
            return err;
        }
        return user;
    }
    async validate(username, password, active_on) {
        const user = await user_entity_1.User.getRepository()
            .createQueryBuilder('user')
            .where('user.email = :email', {
            email: username,
        })
            .andWhere('user.active_on = :activeOn', { activeOn: active_on })
            .getOne();
        if (user && (await user.validatePassword(password))) {
            return user;
        }
        else {
            return null;
        }
    }
    validateApiKey(apiKey) {
        return this.apiKeys.find(apiK => apiKey === apiK);
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        user_repository_1.UserRepository,
        config_1.ConfigService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map