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
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const base_dto_1 = require("../../commons/base.dto");
class CreateProductDto extends base_dto_1.BaseDto {
}
__decorate([
    swagger_1.ApiProperty({
        required: false,
    }),
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "name", void 0);
__decorate([
    swagger_1.ApiProperty({
        required: true,
    }),
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "id_umkm", void 0);
__decorate([
    swagger_1.ApiProperty({
        required: false,
        default: 0,
        minimum: 0,
        type: Number,
    }),
    class_transformer_1.Transform(value => Number(value)),
    class_validator_1.IsNumber(),
    class_validator_1.IsOptional(),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "sale", void 0);
__decorate([
    swagger_1.ApiProperty({
        required: false,
    }),
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "description", void 0);
__decorate([
    swagger_1.ApiProperty({
        required: false,
    }),
    class_validator_1.IsOptional(),
    __metadata("design:type", Boolean)
], CreateProductDto.prototype, "status", void 0);
__decorate([
    swagger_1.ApiProperty({
        required: false,
        default: 0,
        minimum: 0,
        type: Number,
    }),
    class_transformer_1.Transform(value => Number(value)),
    class_validator_1.IsNumber(),
    class_validator_1.IsOptional(),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "price", void 0);
__decorate([
    swagger_1.ApiProperty({
        required: false,
    }),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "category", void 0);
__decorate([
    swagger_1.ApiProperty({
        type: 'string',
        required: false,
    }),
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "others_description", void 0);
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