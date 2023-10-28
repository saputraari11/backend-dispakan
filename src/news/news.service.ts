import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { News } from './news.entity'
import { Repository } from 'typeorm'
import { CreateNewsDto } from './dto/create-news.dto'
import { responseTemplate } from 'src/app.utils'
import * as fs from 'fs'
import { StorageService } from 'src/commons/storage/storage.service'
import { v4 } from 'uuid'
import { FilterAllNews } from './dto/filter-all.dto'
import { Comment } from 'src/comment/comment.entity'
import { UpdateNewsDto } from './dto/update-news.dto'

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News)
    private readonly newsRepository: Repository<News>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    private storageService: StorageService,
  ) {}

  async allNews(filterAllNews: FilterAllNews) {
    let request_news = this.newsRepository
      .createQueryBuilder('news')

    if (filterAllNews && filterAllNews.search) {
      request_news = request_news.andWhere(
        'news.title ILIKE :searchTerm or news.description ILIKE :searchTerm',
        { searchTerm: `%${filterAllNews.search}%` },
      )
    }

    request_news = request_news.andWhere('news.active_on = :activeOn', {
        activeOn: filterAllNews.active_on,
      }).leftJoinAndSelect('news.comments', 'comments')

    const news = await request_news.getMany()

    if (news.length == 0) {
      return responseTemplate('400', "news doesn't exist", {}, true)
    }

    news.map(
      item =>
        (item.url_image = `${process.env.LINK_GCP}/news/${item.active_on}/${item.mediaId}.png`),
    )

    return responseTemplate('200', 'success', news)
  }

  async detailNews(id: string) {
    const news = await this.newsRepository.findOne({
      where: { id: id },
      relations: ['comments'],
    })

    if (!news) {
      return responseTemplate('404', 'gagal', {})
    }

    if (news.mediaId) {
      news.url_image = `${process.env.LINK_GCP}/news/${news.active_on}/${news.mediaId}.png`
    }

    return responseTemplate('200', 'success', news)
  }

  async uploadNews(uploadNews: CreateNewsDto) {
    const { file, status, title, posted_date, active_on } = uploadNews

    const news = new News()
    news.title = title || ''
    news.posted_date = posted_date ? new Date(posted_date) : new Date()
    news.description = uploadNews.description || ''
    news.active_on = active_on || ''

    if (typeof status == 'string') news.status = status == 'true' ? true:false
    else news.status = status

    if (uploadNews.file) {
      news.mediaId = v4()
      await this.storageService.save(
        `news/${news.active_on}/${news.mediaId}`,
        file.mimetype,
        file.buffer,
        [{ mediaId: news.mediaId }],
      )
    }

    try {
      await this.newsRepository.save(news)
    } catch (err) {
      console.log('error query', err)
    }

    return responseTemplate('200', 'success', news)
  }

  async updateNews(updateNews: UpdateNewsDto, id: string) {
    const news = (await this.detailNews(id)).data

    if (!news.title) {
      return responseTemplate('404', 'gagal', {})
    }

    if (updateNews.file) {
      try {
        await this.storageService.delete(
          `news/${news.active_on}/${news.mediaId}`,
        )
      } catch (err) {
        console.log('error delete', err)
      }

      news.mediaId = v4()

      try {
        await this.storageService.save(
          `news/${news.active_on}/${news.mediaId}`,
          updateNews.file.mimetype,
          updateNews.file.buffer,
          [{ mediaId: news.mediaId }],
        )
      } catch (err) {
        console.log('error upload', err)
      }
    }

    try {
      if (updateNews.status) {
        if (typeof updateNews.status == 'string') news.status = updateNews.status == 'true' ? true:false
        else news.status = updateNews.status
      }

      if (updateNews.title) news.title = updateNews.title
      if (updateNews.posted_date)
        news.posted_date = updateNews.posted_date
          ? new Date(updateNews.posted_date)
          : new Date()
      if (updateNews.description) news.description = updateNews.description
    } catch (err) {
      console.log('error parsing data', err)
    }
    try {
      await this.newsRepository.save(news)
    } catch (err) {
      console.log('error query', err)
    }

    return responseTemplate('200', 'success', news)
  }

  async deleteNews(id: string) {
    let response = ''
    const news = (await this.detailNews(id)).data

    if (news.comments.length > 0) {
      for (let c of news.comments) {
        await this.commentRepository.remove(c)
      }
    }

    try {
      await this.storageService.delete(`news/${news.active_on}/${news.mediaId}`)
      response = `${news.posted_date}. ${news.mediaId} deleted`
    } catch (e) {
      response = `${news.posted_date}. ${news.mediaId}, ${e.message}`
    }

    await this.newsRepository.remove(news)

    return responseTemplate('200', 'success', response)
  }
}
