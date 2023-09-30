"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const typeorm_1 = require("typeorm");
const bcrypt = require("bcrypt");
const user_entity_1 = require("./user.entity");
let UserRepository = class UserRepository extends typeorm_1.Repository {
    async signup(signupCredentialsDto) {
        const { name, password, email, level, address, phone, active_on, createdBy } = signupCredentialsDto;
        const user = new user_entity_1.User();
        if (name)
            user.name = name;
        if (address)
            user.address = address;
        if (phone)
            user.phone = phone;
        user.email = email;
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(password, user.salt);
        user.level = level;
        user.active_on = active_on;
        if (createdBy)
            user.createdBy = createdBy.email;
        const savedUser = await user.save();
        return savedUser;
    }
    async validateUserPassword(user_name, password) {
        const user = await user_entity_1.User.getRepository()
            .createQueryBuilder('user')
            .where('user.user_name = :user_name OR user.email = :user_name', {
            user_name: user_name,
        })
            .getOne();
        if (user && (await user.validatePassword(password))) {
            return user;
        }
        else {
            return null;
        }
    }
    async hashPassword(password, salt) {
        return bcrypt.hash(password, salt);
    }
};
UserRepository = __decorate([
    typeorm_1.EntityRepository(user_entity_1.User)
], UserRepository);
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repository.js.map