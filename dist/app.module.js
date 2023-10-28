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
const product_module_1 = require("./product/product.module");
const app_logger_middleware_1 = require("./commons/middlewares/app-logger-middleware");
const comment_module_1 = require("./comment/comment.module");
const landing_page_module_1 = require("./landing-page/landing-page.module");
const throttler_1 = require("@nestjs/throttler");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(auth_middleware_1.AuthMiddleware)
            .forRoutes({ path: '/auth/signup/bumdes', method: common_1.RequestMethod.POST }, { path: '/landing-page/news', method: common_1.RequestMethod.ALL }, { path: '/landing-page/product', method: common_1.RequestMethod.ALL }, { path: '/landing-page/action', method: common_1.RequestMethod.ALL });
        consumer.apply(app_logger_middleware_1.AppLoggerMiddleware).forRoutes('*');
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
            store_module_1.StoreModule,
            product_module_1.ProductModule,
            comment_module_1.CommentModule,
            landing_page_module_1.LandingPageModule,
            throttler_1.ThrottlerModule.forRoot([
                {
                    name: 'short',
                    ttl: 1000,
                    limit: 3,
                },
                {
                    name: 'medium',
                    ttl: 10000,
                    limit: 20,
                },
                {
                    name: 'long',
                    ttl: 60000,
                    limit: 100,
                },
            ]),
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map