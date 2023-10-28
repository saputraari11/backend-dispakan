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
exports.SignInDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const app_utils_1 = require("../../app.utils");
const base_dto_1 = require("../../commons/base.dto");
class SignInDto extends base_dto_1.BaseDto {
}
__decorate([
    swagger_1.ApiProperty({
        description: 'Email address of the user',
    }),
    class_validator_1.IsEmail(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], SignInDto.prototype, "email", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: 'Password in plain text',
    }),
    class_validator_1.IsNotEmpty(),
    class_validator_1.Matches(app_utils_1.REGEX.PASSWORD_RULE),
    __metadata("design:type", String)
], SignInDto.prototype, "password", void 0);
exports.SignInDto = SignInDto;
//# sourceMappingURL=signin.dto.js.map