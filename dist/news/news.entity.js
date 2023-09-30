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
exports.News = void 0;
const comment_entity_1 = require("../comment/comment.entity");
const typeorm_1 = require("typeorm");
let News = class News extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], News.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], News.prototype, "title", void 0);
__decorate([
    typeorm_1.Column({
        type: 'timestamp',
        nullable: true,
    }),
    __metadata("design:type", Date)
], News.prototype, "posted_date", void 0);
__decorate([
    typeorm_1.Column('text', {
        nullable: true,
    }),
    __metadata("design:type", String)
], News.prototype, "filename", void 0);
__decorate([
    typeorm_1.Column('text', {
        nullable: true,
    }),
    __metadata("design:type", String)
], News.prototype, "image", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], News.prototype, "status", void 0);
__decorate([
    typeorm_1.Column({
        type: 'text',
        nullable: true,
    }),
    __metadata("design:type", String)
], News.prototype, "description", void 0);
__decorate([
    typeorm_1.Column({
        nullable: true,
    }),
    __metadata("design:type", String)
], News.prototype, "active_on", void 0);
__decorate([
    typeorm_1.Column({
        nullable: true,
    }),
    __metadata("design:type", String)
], News.prototype, "mediaId", void 0);
__decorate([
    typeorm_1.CreateDateColumn({
        type: 'timestamp',
        name: 'createdAt',
        default: () => 'CURRENT_TIMESTAMP(6)',
    }),
    __metadata("design:type", Date)
], News.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({
        type: 'timestamp',
        name: 'updatedAt',
        default: () => 'CURRENT_TIMESTAMP(6)',
    }),
    __metadata("design:type", Date)
], News.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.OneToMany(type => comment_entity_1.Comment, c => c.news),
    __metadata("design:type", Array)
], News.prototype, "comments", void 0);
News = __decorate([
    typeorm_1.Entity()
], News);
exports.News = News;
//# sourceMappingURL=news.entity.js.map