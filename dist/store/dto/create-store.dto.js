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
exports.CreateStoreDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const base_dto_1 = require("../../commons/base.dto");
class CreateStoreDto extends base_dto_1.BaseDto {
}
__decorate([
    swagger_1.ApiProperty({
        required: false,
    }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateStoreDto.prototype, "name", void 0);
__decorate([
    swagger_1.ApiProperty({
        required: true,
    }),
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateStoreDto.prototype, "id_owner", void 0);
__decorate([
    swagger_1.ApiProperty({
        required: false,
    }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateStoreDto.prototype, "address", void 0);
__decorate([
    swagger_1.ApiProperty({
        required: false,
    }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateStoreDto.prototype, "phone", void 0);
__decorate([
    swagger_1.ApiProperty({
        required: false,
    }),
    class_validator_1.IsOptional(),
    __metadata("design:type", Object)
], CreateStoreDto.prototype, "status", void 0);
__decorate([
    swagger_1.ApiProperty({
        required: false,
    }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateStoreDto.prototype, "aspek", void 0);
__decorate([
    swagger_1.ApiProperty({
        required: false,
        isArray: true,
        type: String,
    }),
    class_validator_1.IsString(),
    __metadata("design:type", Array)
], CreateStoreDto.prototype, "category", void 0);
__decorate([
    swagger_1.ApiProperty({
        isArray: true,
        required: false,
        type: String,
    }),
    class_validator_1.IsString(),
    __metadata("design:type", Array)
], CreateStoreDto.prototype, "mediaOrder", void 0);
__decorate([
    swagger_1.ApiProperty({
        isArray: true,
        required: false,
        type: String,
    }),
    class_validator_1.IsString(),
    __metadata("design:type", Array)
], CreateStoreDto.prototype, "mediaContact", void 0);
__decorate([
    swagger_1.ApiProperty({
        required: false,
    }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateStoreDto.prototype, "omset", void 0);
__decorate([
    swagger_1.ApiProperty({ type: 'string', format: 'binary', required: false }),
    __metadata("design:type", Object)
], CreateStoreDto.prototype, "file", void 0);
exports.CreateStoreDto = CreateStoreDto;
//# sourceMappingURL=create-store.dto.js.map