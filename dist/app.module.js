"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const auth_module_1 = require("./auth/auth.module");
const config_module_1 = require("./config/config.module");
const database_module_1 = require("./database/database.module");
const users_module_1 = require("./users/users.module");
const auth_middleware_1 = require("./auth/auth.middleware");
const news_module_1 = require("./news/news.module");
const store_module_1 = require("./store/store.module");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(auth_middleware_1.AuthMiddleware)
            .forRoutes({ path: '/auth/signup/bumdes', method: common_1.RequestMethod.POST });
    }
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            config_module_1.AppConfigModule,
            users_module_1.UsersModule,
            database_module_1.DatabaseModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            news_module_1.NewsModule,
            store_module_1.StoreModule
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map