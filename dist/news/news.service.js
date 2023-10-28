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
const storage_service_1 = require("../commons/storage/storage.service");
const uuid_1 = require("uuid");
const comment_entity_1 = require("../comment/comment.entity");
let NewsService = class NewsService {
    constructor(newsRepository, commentRepository, storageService) {
        this.newsRepository = newsRepository;
        this.commentRepository = commentRepository;
        this.storageService = storageService;
    }
    async allNews(filterAllNews) {
        let request_news = this.newsRepository
            .createQueryBuilder('news');
        if (filterAllNews && filterAllNews.search) {
            request_news = request_news.andWhere('news.title ILIKE :searchTerm or news.description ILIKE :searchTerm', { searchTerm: `%${filterAllNews.search}%` });
        }
        request_news = request_news.andWhere('news.active_on = :activeOn', {
            activeOn: filterAllNews.active_on,
        }).leftJoinAndSelect('news.comments', 'comments');
        const news = await request_news.getMany();
        if (news.length == 0) {
            return app_utils_1.responseTemplate('400', "news doesn't exist", {}, true);
        }
        news.map(item => (item.url_image = `${process.env.LINK_GCP}/news/${item.active_on}/${item.mediaId}.png`));
        return app_utils_1.responseTemplate('200', 'success', news);
    }
    async detailNews(id) {
        const news = await this.newsRepository.findOne({
            where: { id: id },
            relations: ['comments'],
        });
        if (!news) {
            return app_utils_1.responseTemplate('404', 'gagal', {});
        }
        if (news.mediaId) {
            news.url_image = `${process.env.LINK_GCP}/news/${news.active_on}/${news.mediaId}.png`;
        }
        return app_utils_1.responseTemplate('200', 'success', news);
    }
    async uploadNews(uploadNews) {
        const { file, status, title, posted_date, active_on } = uploadNews;
        const news = new news_entity_1.News();
        news.title = title || '';
        news.posted_date = posted_date ? new Date(posted_date) : new Date();
        news.description = uploadNews.description || '';
        news.active_on = active_on || '';
        if (typeof status == 'string')
            news.status = status == 'true' ? true : false;
        else
            news.status = status;
        if (uploadNews.file) {
            news.mediaId = uuid_1.v4();
            await this.storageService.save(`news/${news.active_on}/${news.mediaId}`, file.mimetype, file.buffer, [{ mediaId: news.mediaId }]);
        }
        try {
            await this.newsRepository.save(news);
        }
        catch (err) {
            console.log('error query', err);
        }
        return app_utils_1.responseTemplate('200', 'success', news);
    }
    async updateNews(updateNews, id) {
        const news = (await this.detailNews(id)).data;
        if (!news.title) {
            return app_utils_1.responseTemplate('404', 'gagal', {});
        }
        if (updateNews.file) {
            try {
                await this.storageService.delete(`news/${news.active_on}/${news.mediaId}`);
            }
            catch (err) {
                console.log('error delete', err);
            }
            news.mediaId = uuid_1.v4();
            try {
                await this.storageService.save(`news/${news.active_on}/${news.mediaId}`, updateNews.file.mimetype, updateNews.file.buffer, [{ mediaId: news.mediaId }]);
            }
            catch (err) {
                console.log('error upload', err);
            }
        }
        try {
            if (updateNews.status) {
                if (typeof updateNews.status == 'string')
                    news.status = updateNews.status == 'true' ? true : false;
                else
                    news.status = updateNews.status;
            }
            if (updateNews.title)
                news.title = updateNews.title;
            if (updateNews.posted_date)
                news.posted_date = updateNews.posted_date
                    ? new Date(updateNews.posted_date)
                    : new Date();
            if (updateNews.description)
                news.description = updateNews.description;
        }
        catch (err) {
            console.log('error parsing data', err);
        }
        try {
            await this.newsRepository.save(news);
        }
        catch (err) {
            console.log('error query', err);
        }
        return app_utils_1.responseTemplate('200', 'success', news);
    }
    async deleteNews(id) {
        let response = '';
        const news = (await this.detailNews(id)).data;
        if (news.comments.length > 0) {
            for (let c of news.comments) {
                await this.commentRepository.remove(c);
            }
        }
        try {
            await this.storageService.delete(`news/${news.active_on}/${news.mediaId}`);
            response = `${news.posted_date}. ${news.mediaId} deleted`;
        }
        catch (e) {
            response = `${news.posted_date}. ${news.mediaId}, ${e.message}`;
        }
        await this.newsRepository.remove(news);
        return app_utils_1.responseTemplate('200', 'success', response);
    }
};
NewsService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(news_entity_1.News)),
    __param(1, typeorm_1.InjectRepository(comment_entity_1.Comment)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        storage_service_1.StorageService])
], NewsService);
exports.NewsService = NewsService;
//# sourceMappingURL=news.service.js.map