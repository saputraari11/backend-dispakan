"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const store_entity_1 = require("./store.entity");
const store_service_1 = require("./store.service");
const store_controller_1 = require("./store.controller");
const users_service_1 = require("../users/users.service");
const user_entity_1 = require("../users/user.entity");
const storage_service_1 = require("../commons/storage/storage.service");
let StoreModule = class StoreModule {
};
StoreModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([store_entity_1.Store, user_entity_1.User])],
        controllers: [store_controller_1.StoreController],
        providers: [store_service_1.StoreService, users_service_1.UsersService, storage_service_1.StorageService],
    })
], StoreModule);
exports.StoreModule = StoreModule;
//# sourceMappingURL=store.module.js.map