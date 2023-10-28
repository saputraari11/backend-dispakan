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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const user_level_enum_1 = require("../users/user-level.enum");
const app_utils_1 = require("../app.utils");
const auth_service_1 = require("./auth.service");
const signup_credentials_dto_1 = require("./dto/signup-credentials.dto");
const signin_dto_1 = require("./dto/signin.dto");
const throttler_1 = require("@nestjs/throttler");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async signin(signInCredentialsDto) {
        try {
            return this.authService.signIn(signInCredentialsDto);
        }
        catch (err) {
            return err;
        }
    }
    async signUp(signUpCredentialsDto) {
        const data = await this.authService.signUp(signUpCredentialsDto);
        return data;
    }
    async signUpUser(signUpCredentialsDto, request) {
        signUpCredentialsDto.createdBy = request.user;
        return await this.authService.signUp(signUpCredentialsDto, user_level_enum_1.UserLevel.UMKM);
    }
};
__decorate([
    common_1.Post('signin'),
    __param(0, common_1.Body(app_utils_1.SETTINGS.VALIDATION_PIPE)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signin_dto_1.SignInDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signin", null);
__decorate([
    common_1.Post('signup/bumdes'),
    swagger_1.ApiSecurity('X-API-KEY', ['X-API-KEY']),
    __param(0, common_1.Body(app_utils_1.SETTINGS.VALIDATION_PIPE)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signup_credentials_dto_1.SignupCredentialsDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signUp", null);
__decorate([
    common_1.Post('signup/owner-umkm'),
    swagger_1.ApiBearerAuth(),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    __param(0, common_1.Body(app_utils_1.SETTINGS.VALIDATION_PIPE)),
    __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signup_credentials_dto_1.SignupCredentialsDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signUpUser", null);
AuthController = __decorate([
    swagger_1.ApiTags('Auth'),
    common_1.Controller('auth'),
    common_1.UseGuards(throttler_1.ThrottlerGuard),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map