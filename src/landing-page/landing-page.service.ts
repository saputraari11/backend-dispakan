import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { responseTemplate } from 'src/app.utils'
import * as fs from 'fs'
import { v4 } from 'uuid'
import { Product } from 'src/product/product.entity'
import { Store } from 'src/store/store.entity'
import { FilterAllProducts } from './dto/filter-all-product.dto'
import { IncrementDto } from './dto/increment.dto'
import { ClickProduct } from './click-product.entity'
import { LikeProduct } from './like-product.entity'

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
    private readonly likeProductRepository:Repository<LikeProduct>
  ) {}

  async allProductByStore(filterLandingDto: FilterAllProducts) {
    let queryProducts = this.productRepository
      .createQueryBuilder('product')
      .innerJoinAndSelect('product.store', 'store')

    if (filterLandingDto.catagory) {
      queryProducts = queryProducts.andWhere('product.category = :catagory', {
        catagory: filterLandingDto.catagory,
      })
    }

    if (filterLandingDto.sort_by && filterLandingDto.sort_by != '') {
      const filterBy = JSON.parse(filterLandingDto.sort_by)

      if ('best_sale' in filterBy && filterBy['best_sale']) {
        queryProducts = queryProducts
          .andWhere('product.sale > 0')
          .orderBy('sale', 'DESC')
          .orderBy('random()')
      } else if ('best_seller' in filterBy && filterBy['best_seller']) {
      } else {
        queryProducts = queryProducts.orderBy('random()')
      }
    } else {
      queryProducts = queryProducts.orderBy('random()')
    }

    if (filterLandingDto.search) {
      queryProducts = queryProducts.andWhere(
        'products.name ILIKE :searchTerm or products.description ILIKE :searchTerm or store.name ILIKE :searchTerm or store.address ILIKE :searchTerm or store.phone ILIKE :searchTerm or store.omset ILIKE :searchTerm or store.aspek ILIKE :searchTerm',
        { searchTerm: `%${filterLandingDto.search}%` },
      )
    }

    const products = await queryProducts.getMany()

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

    return responseTemplate('200', 'success', products)
  }

  async incrementProperty(incrementDto:IncrementDto) {
    const product = await this.productRepository.findOne({where:{id:incrementDto.id_product}})
     if(!product) {
      throw new NotFoundException("Product does not exist")
    }

    const isLikeExist = await this.likeProductRepository.findOne({where:{identifier:incrementDto.identifier,product:product}})
    const isClickExist = await this.clickProductRepository.findOne({where:{identifier:incrementDto.identifier,product:product}})
   
    switch(incrementDto.increment_type) {
      case "like":
        console.log(isLikeExist,product);
        
        if(!isLikeExist){
          const newLike = new LikeProduct()
          newLike.identifier = incrementDto.identifier
          newLike.product = product
          await this.likeProductRepository.save(newLike)
        }
      break;
      case 'click':
        if(!isClickExist){
          const newClick = new ClickProduct()
          newClick.identifier = incrementDto.identifier
          newClick.product = product
          await this.clickProductRepository.save(newClick)
        }
      break;
      default:
        throw new NotFoundException("Type product doest not exit")
    }

    return {status:200,message:"success"}
  }
}
