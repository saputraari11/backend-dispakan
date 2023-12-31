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
exports.ApiKeyStrategy = void 0;
const passport_headerapikey_1 = require("passport-headerapikey");
const passport_1 = require("@nestjs/passport");
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
let ApiKeyStrategy = class ApiKeyStrategy extends passport_1.PassportStrategy(passport_headerapikey_1.HeaderAPIKeyStrategy) {
    constructor(authService) {
        super({ header: 'X-API-KEY', prefix: '' }, true, (apikey, done, req) => {
            const checkKey = authService.validateApiKey(apikey);
            if (!checkKey) {
                return done(false);
            }
            return done(true);
        });
        this.authService = authService;
    }
};
ApiKeyStrategy = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], ApiKeyStrategy);
exports.ApiKeyStrategy = ApiKeyStrategy;
//# sourceMappingURL=apikey.strategy.js.map