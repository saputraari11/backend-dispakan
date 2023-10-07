import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateCommantDto } from './dto/create-comment.dto'
import { responseTemplate } from 'src/app.utils'
import { Comment } from './comment.entity'
import { FilterAllComment } from './dto/filter-all.dto'
import { News } from 'src/news/news.entity'
import { NewsService } from 'src/news/news.service'
import { UpdateStatusCommentDto } from './dto/update-status-comment.dto'

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commenntRepository: Repository<Comment>,
    private readonly newsService: NewsService,
  ) {}

  async allComment(filterAllComment: FilterAllComment) {
    let request_comment = this.commenntRepository
      .createQueryBuilder('comment')
      .innerJoinAndSelect('comment.news', 'news')
      .where('comment.active_on = :activeOn', {
        activeOn: filterAllComment.active_on,
      })

    if (filterAllComment && filterAllComment.search) {
      request_comment = request_comment.andWhere(
        'comment.name ILIKE :searchTerm or comment.description ILIKE :searchTerm',
        { searchTerm: `%${filterAllComment.search}%` },
      )
    }

    if (filterAllComment && filterAllComment.id_news) {
      request_comment = request_comment.andWhere('news.id = :idNews', {
        idNews: filterAllComment.id_news,
      })
    }

    if (filterAllComment && filterAllComment.status) {
      request_comment = request_comment.andWhere(
        'comment.is_proved = :status',
        { status: filterAllComment.status },
      )
    }

    const comment = await request_comment.getMany()

    if (comment.length == 0) {
      return responseTemplate('400', "comment doesn't exist", {}, true)
    }

    return responseTemplate('200', 'success', comment)
  }

  async detailComment(id: string) {
    const comment = await this.commenntRepository.findOne({ where: { id: id } })

    if (!comment) {
      return responseTemplate('404', 'gagal', {})
    }

    return responseTemplate('200', 'success', comment)
  }

  

  async updateComment(updateComment: CreateCommantDto, id: string) {
    const comment = (await this.detailComment(id)).data

    if (!comment.id) {
      return responseTemplate('404', 'gagal', {})
    }

    try {
      if (updateComment.name) comment.name = updateComment.name
      if (updateComment.description)
        comment.description = updateComment.description
    } catch (err) {
      console.log('error parsing data', err)
    }

    try {
      await this.commenntRepository.save(comment)
    } catch (err) {
      console.log('error query', err)
    }

    return responseTemplate('200', 'success', comment)
  }

  async updateStatus(updateComment: UpdateStatusCommentDto, id: string) {
    const comment = (await this.detailComment(id)).data

    if (!comment.id) {
      return responseTemplate('404', 'gagal', {})
    }

    try {
      comment.is_proved = updateComment.status
    } catch (err) {
      console.log('error parsing data', err)
    }

    try {
      await this.commenntRepository.save(comment)
    } catch (err) {
      console.log('error query', err)
    }

    return responseTemplate('200', 'success', comment)
  }

  async deleteComment(id: string) {
    const comment = (await this.detailComment(id)).data
    await this.commenntRepository.remove(comment)

    return responseTemplate('200', 'success', {})
  }
}
