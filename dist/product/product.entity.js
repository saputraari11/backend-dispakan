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
exports.Product = void 0;
const click_product_entity_1 = require("../landing-page/click-product.entity");
const like_product_entity_1 = require("../landing-page/like-product.entity");
const store_entity_1 = require("../store/store.entity");
const typeorm_1 = require("typeorm");
let Product = class Product extends typeorm_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.images = null;
        this.others_descriptions = null;
        this.mediaIds = null;
    }
    async countingDiscount() {
        const discount = (this.sale / 100) * this.price;
        this.discount = discount;
        this.price_discount = this.price - discount;
    }
    async convertStringToArray() {
        if (this.imagesSaved)
            this.images = JSON.parse(this.imagesSaved);
        if (this.mediaId)
            this.mediaIds = JSON.parse(this.mediaId);
        if (this.othersSaved)
            this.others_descriptions = JSON.parse(this.othersSaved);
        if (this.like)
            this.jumlah_like = this.like.length;
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], Product.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Product.prototype, "sale", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Product.prototype, "price", void 0);
__decorate([
    typeorm_1.Column({
        type: 'text',
        nullable: true,
    }),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    typeorm_1.Column({
        type: 'text',
        nullable: true,
    }),
    __metadata("design:type", String)
], Product.prototype, "filenameSaved", void 0);
__decorate([
    typeorm_1.Column({
        type: 'text',
        nullable: true,
    }),
    __metadata("design:type", String)
], Product.prototype, "imagesSaved", void 0);
__decorate([
    typeorm_1.Column({
        type: 'text',
        nullable: true,
    }),
    __metadata("design:type", String)
], Product.prototype, "othersSaved", void 0);
__decorate([
    typeorm_1.Column({ nullable: null }),
    __metadata("design:type", String)
], Product.prototype, "category", void 0);
__decorate([
    typeorm_1.Column({
        type: 'text',
        nullable: true,
    }),
    __metadata("design:type", String)
], Product.prototype, "mediaId", void 0);
__decorate([
    typeorm_1.Column({
        nullable: true,
    }),
    __metadata("design:type", String)
], Product.prototype, "active_on", void 0);
__decorate([
    typeorm_1.Column({
        default: false,
    }),
    __metadata("design:type", Boolean)
], Product.prototype, "status", void 0);
__decorate([
    typeorm_1.CreateDateColumn({
        type: 'timestamp',
        name: 'createdAt',
        default: () => 'CURRENT_TIMESTAMP(6)',
    }),
    __metadata("design:type", Date)
], Product.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({
        type: 'timestamp',
        name: 'updatedAt',
        default: () => 'CURRENT_TIMESTAMP(6)',
    }),
    __metadata("design:type", Date)
], Product.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.ManyToOne(type => store_entity_1.Store, s => s.product),
    __metadata("design:type", store_entity_1.Store)
], Product.prototype, "store", void 0);
__decorate([
    typeorm_1.OneToMany(type => like_product_entity_1.LikeProduct, l => l.product),
    __metadata("design:type", Array)
], Product.prototype, "like", void 0);
__decorate([
    typeorm_1.OneToMany(type => click_product_entity_1.ClickProduct, c => c.product),
    __metadata("design:type", Array)
], Product.prototype, "click", void 0);
Product = __decorate([
    typeorm_1.Entity()
], Product);
exports.Product = Product;
//# sourceMappingURL=product.entity.js.map