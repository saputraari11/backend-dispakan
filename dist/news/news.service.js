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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const news_entity_1 = require("./news.entity");
const typeorm_2 = require("typeorm");
const app_utils_1 = require("../app.utils");
const fs = require("fs");
let NewsService = class NewsService {
    constructor(newsRepository) {
        this.newsRepository = newsRepository;
    }
    async allNews(url) {
        const news = await this.newsRepository.find();
        if (news.length == 0) {
            return app_utils_1.responseTemplate('400', "news doesn't exist", {}, true);
        }
        news.map(item => (item.url_image = `${url}/${item.filename}`));
        return app_utils_1.responseTemplate('200', 'success', news);
    }
    async detailNews(id, url) {
        const news = await this.newsRepository.findOne({ where: { id: id } });
        if (!news) {
            throw new common_1.NotFoundException(`news with id ${id} not found`);
        }
        if (url) {
            news.url_image = `${url}/${news.filename}`;
        }
        return app_utils_1.responseTemplate('200', 'success', news);
    }
    async uploadNews(uploadNews) {
        const { file, status, title, posted_date } = uploadNews;
        const news = new news_entity_1.News();
        news.status = !!status;
        news.title = title;
        news.posted_date = new Date(posted_date);
        news.description = uploadNews.description;
        if (uploadNews.file) {
            news.filename = file.filename;
            news.image = file.path;
        }
        await this.newsRepository.save(news);
        return app_utils_1.responseTemplate('200', 'success', news);
    }
    async updateNews(updateNews, id) {
        const news = (await this.detailNews(id)).data;
        if (updateNews.file) {
            if (fs.existsSync(news.image)) {
                fs.unlinkSync(news.image);
            }
            news.filename = updateNews.file.filename;
            news.image = updateNews.file.path;
        }
        if (updateNews.status)
            news.status = !!updateNews.status;
        if (updateNews.title)
            news.title = updateNews.title;
        if (updateNews.posted_date)
            news.posted_date = new Date(updateNews.posted_date);
        if (updateNews.description)
            news.description = updateNews.description;
        await this.newsRepository.save(news);
        return app_utils_1.responseTemplate('200', 'success', news);
    }
    async deleteNews(id) {
        let response = '';
        const news = (await this.detailNews(id)).data;
        try {
            fs.unlinkSync(news.image);
            response = `${news.postedAt}. ${news.image} deleted`;
        }
        catch (e) {
            response = `${news.postedAt}. ${news.image}, ${e.message}`;
        }
        await this.newsRepository.remove(news);
        return app_utils_1.responseTemplate('200', 'success', response);
    }
};
NewsService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(news_entity_1.News)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], NewsService);
exports.NewsService = NewsService;
//# sourceMappingURL=news.service.js.map