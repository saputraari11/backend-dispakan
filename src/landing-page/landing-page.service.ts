import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { responseTemplate } from '../app.utils'
import * as fs from 'fs'
import { v4 } from 'uuid'
import { Product } from '../product/product.entity'
import { Store } from '../store/store.entity'
import { FilterAllProducts } from './dto/filter-all-product.dto'
import { IncrementDto } from './dto/increment.dto'
import { ClickProduct } from './click-product.entity'
import { LikeProduct } from './like-product.entity'
import { CreateCommantDto } from '../comment/dto/create-comment.dto'
import { News } from '../news/news.entity'
import { Comment } from '../comment/comment.entity'
import * as moment from 'moment'
import { FilterAllNews } from '../news/dto/filter-all.dto'
import { User } from '../users/user.entity'
import { UserLevel } from '../users/user-level.enum'

@Injectable()
export class LandingPageService {
  constructor(
    @InjectRepository(Store)
    private readonly storeRepository: Repository<Store>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ClickProduct)
    private readonly clickProductRepository: Repository<ClickProduct>,
    @InjectRepository(LikeProduct)
    private readonly likeProductRepository: Repository<LikeProduct>,
    @InjectRepository(News)
    private readonly newsRepository: Repository<News>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async detailProduct(id: string) {
    const product = await this.productRepository.findOne({
      where: { id: id },
      relations: ['store', 'click', 'like'],
    })
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`)
    }

    if (product.sale && product.price) {
      await product.countingDiscount()
    }

    await product.convertStringToArray()

    product.store.url_image = `${process.env.LINK_GCP}/umkm/${product.store.active_on}/${product.store.mediaId}.png`
    await product.store.convertStringToArray()

    if (product.mediaIds && product.mediaIds.length > 0) {
      const urlImage = product.mediaIds.map(
        file =>
          `${process.env.LINK_GCP}/products/${product.active_on}/${file}.png`,
      )

      product.images = urlImage
    }

    return responseTemplate('200', 'success', product)
  }

  async allProductByStore(filterLandingDto: FilterAllProducts) {
    let queryProducts = this.productRepository
      .createQueryBuilder('product')
      .innerJoinAndSelect('product.store', 'store')
      .leftJoinAndSelect('product.like', 'like')

    if (filterLandingDto.catagory) {
      queryProducts = queryProducts.andWhere('product.category = :catagory', {
        catagory: filterLandingDto.catagory,
      })
    }

    let isSortedBy = false
    let filterBy = {}

    if (filterLandingDto.sort_by && filterLandingDto.sort_by != '') {
      filterBy = JSON.parse(filterLandingDto.sort_by)

      if ('best_sale' in filterBy && filterBy['best_sale']) {
        queryProducts = queryProducts
          .andWhere('product.sale > 0')
          .orderBy('sale', 'DESC')
          .orderBy('random()')
      } else {
        queryProducts = queryProducts.orderBy('random()')
      }

      isSortedBy = true
    } else {
      queryProducts = queryProducts.orderBy('random()')
    }

    if (filterLandingDto.search) {
      queryProducts = queryProducts.andWhere(
        'products.name ILIKE :searchTerm or products.description ILIKE :searchTerm or store.name ILIKE :searchTerm or store.address ILIKE :searchTerm or store.phone ILIKE :searchTerm or store.omset ILIKE :searchTerm or store.aspek ILIKE :searchTerm',
        { searchTerm: `%${filterLandingDto.search}%` },
      )
    }

    let products = await queryProducts.getMany()

    for (let product of products) {
      await product.convertStringToArray()

      if (product.mediaIds && product.mediaIds.length > 0) {
        const urlImage = product.mediaIds.map(
          file =>
            `${process.env.LINK_GCP}/products/${product.active_on}/${file}.png`,
        )

        product.images = urlImage
      }
      await product.store.convertStringToArray()
      product.store.url_image = `${process.env.LINK_GCP}/umkm/${product.store.active_on}/${product.store.mediaId}.png`
    }

    if (isSortedBy) {
      if ('best_seller' in filterBy && filterBy['best_seller']) {
        products = products.filter(item => item.jumlah_like > 0)
      }
    }

    return responseTemplate('200', 'success', products)
  }

  async incrementProperty(incrementDto: IncrementDto) {
    const product = await this.productRepository.findOne({
      where: { id: incrementDto.id_product },
    })
    if (!product) {
      throw new NotFoundException('Product does not exist')
    }

    const isLikeExist = await this.likeProductRepository.findOne({
      where: { identifier: incrementDto.identifier, product: product },
    })
    const isClickExist = await this.clickProductRepository.findOne({
      where: { identifier: incrementDto.identifier, product: product },
    })

    switch (incrementDto.increment_type) {
      case 'like':
        console.log(isLikeExist, product)

        if (!isLikeExist) {
          const newLike = new LikeProduct()
          newLike.identifier = incrementDto.identifier
          newLike.product = product
          await this.likeProductRepository.save(newLike)
        }
        break
      case 'click':
        if (!isClickExist) {
          const newClick = new ClickProduct()
          newClick.identifier = incrementDto.identifier
          newClick.product = product
          await this.clickProductRepository.save(newClick)
        }
        break
      default:
        throw new NotFoundException('Type product doest not exit')
    }

    return { status: 200, message: 'success' }
  }

  async allNews(filterAllNews: FilterAllNews) {
    let request_news = this.newsRepository
      .createQueryBuilder('news')
      .where('news.active_on = :activeOn', {
        activeOn: filterAllNews.active_on,
      })
      .andWhere('news.status = :status', { status: true })
      .leftJoinAndSelect('news.comments', 'comments')

    if (filterAllNews && filterAllNews.search) {
      request_news = request_news.andWhere(
        'news.title ILIKE :searchTerm or news.description ILIKE :searchTerm',
        { searchTerm: `%${filterAllNews.search}%` },
      )
    }

    const news = await request_news.getMany()

    if (news.length == 0) {
      return responseTemplate('400', "news doesn't exist", {}, true)
    }

    news.map(item => {
      item.url_image = `${process.env.LINK_GCP}/news/${item.active_on}/${item.mediaId}.png`

      if (item.comments.length > 0) {
        for (let comment of item.comments) {
          if (comment.is_proved == 'belum disetujui') {
            item.comments = item.comments.filter(c => c.id != comment.id)
          }
        }
      }
    })

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

    if (news.comments.length > 0) {
      for (let comment of news.comments) {
        if (comment.is_proved == 'belum disetujui') {
          news.comments = news.comments.filter(item => item.id != comment.id)
        }
      }
    }

    if (news.mediaId) {
      news.url_image = `${process.env.LINK_GCP}/news/${news.active_on}/${news.mediaId}.png`
    }

    return responseTemplate('200', 'success', news)
  }

  async uploadComment(uploadComment: CreateCommantDto) {
    const comment = new Comment()
    comment.active_on = uploadComment.active_on
    comment.description = uploadComment.description
    comment.name = uploadComment.name
    comment.periode = uploadComment.periode
      ? moment(uploadComment.periode).toDate()
      : moment().toDate()

    const news = await this.newsRepository.findOne({
      where: { id: uploadComment.id_news },
    })

    if (!news.id) {
      throw new NotFoundException('beritanya tidak ada kawan!')
    }

    comment.news = news

    try {
      await this.commentRepository.save(comment)
    } catch (err) {
      console.log('error query', err)
    }

    return responseTemplate('200', 'success', comment)
  }

  // bumdes page admin
  async getBumdesDashboard(active_on: string) {
    const countUmkm = await this.storeRepository.findAndCount({
      where: { active_on: active_on },
    })
    const countUsers = await this.userRepository.findAndCount({
      where: { active_on: active_on, level: UserLevel.UMKM },
    })
    const products = await this.productRepository.find({
      where: { active_on: active_on },
      relations: ['click', 'like'],
    })
    const store = await this.storeRepository.find({
      where: { active_on: active_on },
    })
    const news = await this.newsRepository.find({
      where: { active_on: active_on },
      relations: ['comments'],
    })

    let countVisited = 0
    const countLikeProduct = {}

    // pie chart
    const countCatagory = {}
    let countNotificationComment = 0
    const notifications = []

    for (let p of products) {
      countVisited += p.click.length

      if (p.name in countLikeProduct) {
        countLikeProduct[p.name] += p.like.length
      } else {
        countLikeProduct[p.name] = p.like.length
      }
    }

    for (let s of store) {
      await s.convertStringToArray()

      if (s.katagori_umkm && s.katagori_umkm.length > 0) {
        for (let item of s.katagori_umkm) {
          if (item in countCatagory) {
            countCatagory[item]++
          } else {
            countCatagory[item] = 1
          }
        }
      }
    }

    for (let n of news) {
      if (n.comments && n.comments.length > 0) {
        for (let c of n.comments) {
          let notificationComment = {}
          if (c.is_proved == 'belum disetujui') {
            countNotificationComment++
            notificationComment['user'] = c.name
            notificationComment['news'] = n.title
            notificationComment['message'] = c.description
            notifications.push(notificationComment)
          }
        }
      }
    }

    return {
      data_bar_chart: {
        countedUmkm: countUmkm[1],
        countedUsers: countUsers[1],
        countedVisited: countVisited,
      },
      data_pie_chart: countCatagory,
      data_rank_like: countLikeProduct,
      notifications: {
        data: notifications,
        total: countNotificationComment,
      },
    }
  }

  async getUmkmDashboard(active_on: string) {
    let countRankViews = {}
    let countRankLike = {}
    const products = await this.productRepository.find({
      where: { active_on: active_on },
      relations: ['click', 'like'],
    })
    let countViewedStore = 0

    for (let p of products) {
      if (p.click && p.click.length > 0) {
        countViewedStore += p.click.length
      }

      if (p.name in countRankLike) {
        countRankLike[p.name] += p.like.length
      } else {
        countRankLike[p.name] = p.like.length
      }

      if (p.name in countRankViews) {
        countRankViews[p.name] += p.click.length
      } else {
        countRankViews[p.name] = p.click.length
      }
    }

    return {
      data_bar_chart: {
        countedProduct: products.length,
        countedViewedStore: countViewedStore,
      },
      data_rank_views: countRankViews,
      data_rank_like: countRankLike,
    }
  }
}
