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
exports.CreateProductDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateProductDto {
}
__decorate([
    swagger_1.ApiProperty({
        required: false,
    }),
    __metadata("design:type", String)
], CreateProductDto.prototype, "name", void 0);
__decorate([
    swagger_1.ApiProperty({
        required: true,
    }),
    __metadata("design:type", String)
], CreateProductDto.prototype, "id_umkm", void 0);
__decorate([
    swagger_1.ApiProperty({
        required: false,
        default: 0,
    }),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "sale", void 0);
__decorate([
    swagger_1.ApiProperty({
        required: false,
    }),
    __metadata("design:type", String)
], CreateProductDto.prototype, "description", void 0);
__decorate([
    swagger_1.ApiProperty({
        required: false,
        default: 0,
    }),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "price", void 0);
__decorate([
    swagger_1.ApiProperty({
        required: true,
    }),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "category", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "active_on", void 0);
__decorate([
    swagger_1.ApiProperty({
        isArray: true,
        required: false,
        type: String,
    }),
    __metadata("design:type", Array)
], CreateProductDto.prototype, "other", void 0);
__decorate([
    swagger_1.ApiProperty({
        isArray: true,
        required: false,
        type: String,
    }),
    __metadata("design:type", Array)
], CreateProductDto.prototype, "varian", void 0);
__decorate([
    swagger_1.ApiProperty({
        isArray: true,
        required: false,
        type: String,
    }),
    __metadata("design:type", Array)
], CreateProductDto.prototype, "tipe", void 0);
__decorate([
    swagger_1.ApiProperty({
        type: 'array',
        items: {
            type: 'string',
            format: 'binary',
        },
        required: false,
    }),
    __metadata("design:type", Array)
], CreateProductDto.prototype, "files", void 0);
exports.CreateProductDto = CreateProductDto;
//# sourceMappingURL=create-product.dto.js.map