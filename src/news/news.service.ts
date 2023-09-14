import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { News } from './news.entity'
import { Repository } from 'typeorm'
import { CreateNewsDto } from './dto/create-news.dto'
import { responseTemplate } from 'src/app.utils'
import * as fs from 'fs'

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News)
    private readonly newsRepository: Repository<News>,
  ) {}

  async allNews(url: string) {
    const news = await this.newsRepository.find()

    if (news.length == 0) {
      return responseTemplate('400', "news doesn't exist", {}, true)
    }

    news.map(item => (item.url_image = `${url}/${item.filename}`))

    return responseTemplate('200', 'success', news)
  }

  async detailNews(id: string, url?: string) {
    const news = await this.newsRepository.findOne({ where: { id: id } })
    if (!news) {
      throw new NotFoundException(`news with id ${id} not found`)
    }

    if (url) {
      news.url_image = `${url}/${news.filename}`
    }

    return responseTemplate('200', 'success', news)
  }

  async uploadNews(uploadNews: CreateNewsDto) {
    const { file, status, title, posted_date } = uploadNews
    const news = new News()
    news.status = !!status
    news.title = title
    news.posted_date = new Date(posted_date)
    news.description = uploadNews.description

    if (uploadNews.file) {
      news.filename = file.filename
      news.image = file.path
    }

    await this.newsRepository.save(news)
    return responseTemplate('200', 'success', news)
  }

  async updateNews(updateNews: CreateNewsDto, id: string) {
    const news = (await this.detailNews(id)).data

    if (updateNews.file) {
      if (fs.existsSync(news.image)) {
        fs.unlinkSync(news.image)
      }

      news.filename = updateNews.file.filename
      news.image = updateNews.file.path
    }

    if (updateNews.status) news.status = !!updateNews.status
    if (updateNews.title) news.title = updateNews.title
    if (updateNews.posted_date)
      news.posted_date = new Date(updateNews.posted_date)
    if (updateNews.description) news.description = updateNews.description

    await this.newsRepository.save(news)
    return responseTemplate('200', 'success', news)
  }

  async deleteNews(id: string) {
    let response = ''
    const news = (await this.detailNews(id)).data

    try {
      fs.unlinkSync(news.image)
      response = `${news.postedAt}. ${news.image} deleted`
    } catch (e) {
      response = `${news.postedAt}. ${news.image}, ${e.message}`
    }

    await this.newsRepository.remove(news)

    return responseTemplate('200', 'success', response)
  }
}
