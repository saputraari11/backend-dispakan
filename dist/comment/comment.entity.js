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
exports.Comment = void 0;
const news_entity_1 = require("../news/news.entity");
const typeorm_1 = require("typeorm");
let Comment = class Comment extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], Comment.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ default: 'anonymous' }),
    __metadata("design:type", String)
], Comment.prototype, "name", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Comment.prototype, "description", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Date)
], Comment.prototype, "periode", void 0);
__decorate([
    typeorm_1.Column({ default: 'belum disetujui' }),
    __metadata("design:type", String)
], Comment.prototype, "is_proved", void 0);
__decorate([
    typeorm_1.Column({
        nullable: true,
    }),
    __metadata("design:type", String)
], Comment.prototype, "active_on", void 0);
__decorate([
    typeorm_1.CreateDateColumn({
        type: 'timestamp',
        name: 'createdAt',
        default: () => 'CURRENT_TIMESTAMP(6)',
    }),
    __metadata("design:type", Date)
], Comment.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({
        type: 'timestamp',
        name: 'updatedAt',
        default: () => 'CURRENT_TIMESTAMP(6)',
    }),
    __metadata("design:type", Date)
], Comment.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.ManyToOne(type => news_entity_1.News, n => n.comments),
    __metadata("design:type", news_entity_1.News)
], Comment.prototype, "news", void 0);
Comment = __decorate([
    typeorm_1.Entity()
], Comment);
exports.Comment = Comment;
//# sourceMappingURL=comment.entity.js.map