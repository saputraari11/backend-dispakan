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
exports.DatabaseConfig = void 0;
const common_1 = require("@nestjs/common");
const database_config_1 = require("../config/database.config");
const user_entity_1 = require("../users/user.entity");
const product_entity_1 = require("../product/product.entity");
const store_entity_1 = require("../store/store.entity");
const comment_entity_1 = require("../comment/comment.entity");
const news_entity_1 = require("../news/news.entity");
const click_product_entity_1 = require("../landing-page/click-product.entity");
const like_product_entity_1 = require("../landing-page/like-product.entity");
let DatabaseConfig = class DatabaseConfig {
    constructor(config) {
        this.config = config;
    }
    createTypeOrmOptions() {
        return Object.assign(Object.assign({}, this.config), { type: 'postgres', entities: [
                user_entity_1.User,
                product_entity_1.Product,
                store_entity_1.Store,
                news_entity_1.News,
                comment_entity_1.Comment,
                click_product_entity_1.ClickProduct,
                like_product_entity_1.LikeProduct,
            ], ssl: true });
    }
};
DatabaseConfig = __decorate([
    __param(0, common_1.Inject(database_config_1.default.KEY)),
    __metadata("design:paramtypes", [void 0])
], DatabaseConfig);
exports.DatabaseConfig = DatabaseConfig;
//# sourceMappingURL=database.config.js.map