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
exports.Store = void 0;
const product_entity_1 = require("../product/product.entity");
const user_entity_1 = require("../users/user.entity");
const typeorm_1 = require("typeorm");
let Store = class Store extends typeorm_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.media_ordered = null;
        this.media_contact = null;
        this.katagori_umkm = null;
    }
    async convertStringToArray() {
        if (this.katagoriSaved)
            this.katagori_umkm = JSON.parse(this.katagoriSaved).split(',');
        if (this.mediaOrdered)
            this.media_ordered = JSON.parse(this.mediaOrdered).split(',');
        if (this.mediaContact)
            this.media_contact = JSON.parse(this.mediaContact).split(',');
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], Store.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Store.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Store.prototype, "address", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Store.prototype, "phone", void 0);
__decorate([
    typeorm_1.Column({
        type: 'text',
        nullable: true,
    }),
    __metadata("design:type", String)
], Store.prototype, "mediaOrdered", void 0);
__decorate([
    typeorm_1.Column({
        type: 'text',
        nullable: true,
    }),
    __metadata("design:type", String)
], Store.prototype, "mediaContact", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Store.prototype, "omset", void 0);
__decorate([
    typeorm_1.Column({
        nullable: true,
    }),
    __metadata("design:type", String)
], Store.prototype, "filename", void 0);
__decorate([
    typeorm_1.Column({
        nullable: true,
    }),
    __metadata("design:type", String)
], Store.prototype, "image", void 0);
__decorate([
    typeorm_1.Column({
        type: 'text',
        nullable: true,
    }),
    __metadata("design:type", String)
], Store.prototype, "katagoriSaved", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Store.prototype, "aspek", void 0);
__decorate([
    typeorm_1.Column({
        nullable: true,
    }),
    __metadata("design:type", String)
], Store.prototype, "mediaId", void 0);
__decorate([
    typeorm_1.Column({
        nullable: true,
    }),
    __metadata("design:type", String)
], Store.prototype, "active_on", void 0);
__decorate([
    typeorm_1.Column({
        default: false,
    }),
    __metadata("design:type", Boolean)
], Store.prototype, "status", void 0);
__decorate([
    typeorm_1.CreateDateColumn({
        type: 'timestamp',
        name: 'createdAt',
        default: () => 'CURRENT_TIMESTAMP(6)',
    }),
    __metadata("design:type", Date)
], Store.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({
        type: 'timestamp',
        name: 'updatedAt',
        default: () => 'CURRENT_TIMESTAMP(6)',
    }),
    __metadata("design:type", Date)
], Store.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.ManyToOne(type => user_entity_1.User, u => u.store),
    __metadata("design:type", user_entity_1.User)
], Store.prototype, "user", void 0);
__decorate([
    typeorm_1.OneToMany(type => product_entity_1.Product, p => p.store),
    __metadata("design:type", Array)
], Store.prototype, "product", void 0);
Store = __decorate([
    typeorm_1.Entity()
], Store);
exports.Store = Store;
//# sourceMappingURL=store.entity.js.map