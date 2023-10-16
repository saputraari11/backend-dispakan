import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Product } from './product.entity'
import { Repository } from 'typeorm'
import { responseTemplate } from 'src/app.utils'
import { CreateProductDto } from './dto/create-product.dto'
import { StoreService } from 'src/store/store.service'
import * as fs from 'fs'
import { StorageService } from 'src/commons/storage/storage.service'
import { v4 } from 'uuid'
import { FilterAllProducts } from './dto/filter-all.dto'

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly storeService: StoreService,
    private readonly storageService: StorageService,
  ) {}
  async allProduct(filterAllProducts: FilterAllProducts) {
    let queryProducts = this.productRepository
      .createQueryBuilder('products')
      .innerJoinAndSelect('products.store', 'store')
      .where('products.active_on = :active', {
        active: filterAllProducts.active_on,
      })

    if (filterAllProducts && filterAllProducts.search) {
      queryProducts = queryProducts.andWhere(
        'products.name ILIKE :searchTerm or products.description ILIKE :searchTerm',
        { searchTerm: `%${filterAllProducts.search}%` },
      )
    }

    const products = await queryProducts.getMany()

    for (let item of products) {
      if (item.sale && item.price) {
        await item.countingDiscount()
      }

      await item.convertStringToArray()

      if (item.mediaIds && item.mediaIds.length > 0) {
        const urlImage = item.mediaIds.map(
          file =>
            `${process.env.LINK_GCP}/products/${item.active_on}/${file}.png`,
        )

        item.images = urlImage
      }
    }

    if (products.length == 0) {
      return responseTemplate('400', "Product doesn't exist", {}, true)
    }

    return responseTemplate('200', 'success', products)
  }

  async detailProduct(id: string) {
    const product = await this.productRepository.findOne({ where: { id: id } })
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`)
    }

    if (product.sale && product.price) {
      await product.countingDiscount()
    }

    await product.convertStringToArray()

    if (product.mediaIds && product.mediaIds.length > 0) {
      const urlImage = product.mediaIds.map(
        file =>
          `${process.env.LINK_GCP}/products/${product.active_on}/${file}.png`,
      )

      product.images = urlImage
    }

    return responseTemplate('200', 'success', product)
  }

  async saveProduct(uploadProduct: CreateProductDto) {
    try {
      const {
        category,
        description,
        id_umkm,
        name,
        price,
        others_description,
        sale,
        files,
        status,
      } = uploadProduct

      const umkm = (await this.storeService.detailStore(id_umkm)).data
      const product = new Product()

      product.name = name
      product.price = price
      product.sale = sale
      product.description = description
      product.store = umkm
      product.category = category
      product.active_on = uploadProduct.active_on
      product.status = String(status) === 'true' ? true : false
      if (others_description)
        product.othersSaved = JSON.parse(others_description)

      const medias = []
      try {
        if (files && files.length > 0) {
          for (let file of files) {
            const mediaId = v4()
            try {
              await this.storageService.save(
                `products/${product.active_on}/${mediaId}`,
                file.mimetype,
                file.buffer,
                [{ mediaId: mediaId }],
              )
              medias.push(mediaId)
            } catch (err) {
              console.log('error upload', err)
            }
          }
        }
      } catch (err) {
        console.log('gagal up foto', err)
      }

      if (medias.length > 0) product.mediaId = JSON.stringify(medias)

      await this.productRepository.save(product)
      await product.convertStringToArray()
      return responseTemplate('200', 'success', product)
    } catch (err) {
      console.log(err)
    }
  }

  async updateProduct(updateProduct: CreateProductDto, id: string) {
    const product: Product = (await this.detailProduct(id)).data
    await product.convertStringToArray()
    const {
      category,
      description,
      files,
      id_umkm,
      name,
      others_description,
      price,
      sale,
      status,
    } = updateProduct

    const umkm = (await this.storeService.detailStore(id_umkm)).data

    const medias = []

    if (name) product.name = name
    if (price) product.price = price
    if (sale) product.sale = sale
    if (description) product.description = description
    if (umkm) product.store = umkm
    if (category) product.category = category
    if (others_description) product.othersSaved = others_description
    if (status) product.status = String(status) === 'true' ? true : false

    if (files && files.length > 0) {
      for (let file of files) {
        try {
          if (product.mediaIds && product.mediaIds.length) {
            for (let mediaId of product.mediaIds) {
              await this.storageService.delete(
                `products/${product.active_on}/${mediaId}`,
              )
            }
          }
        } catch (err) {
          console.log('error delete', err)
        }

        const mediaId = v4()
        try {
          await this.storageService.save(
            `products/${product.active_on}/${mediaId}`,
            file.mimetype,
            file.buffer,
            [{ mediaId: mediaId }],
          )
          medias.push(mediaId)
        } catch (err) {
          console.log('error upload', err)
        }
      }
    }

    if (medias.length > 0) product.mediaId = JSON.stringify(medias)

    await this.productRepository.save(product)
    await product.convertStringToArray()
    return responseTemplate('200', 'success', product)
  }

  async deleteProduct(id: string) {
    let response = []
    const product: Product = (await this.detailProduct(id)).data
    await product.convertStringToArray()

    if (product) {
      if (product.mediaIds && product.mediaIds.length) {
        for (let mediaId of product.mediaIds) {
          console.log(`products/${product.active_on}/${mediaId}`)

          await this.storageService.delete(
            `products/${product.active_on}/${mediaId}`,
          )
        }
      }
    }

    await this.productRepository.remove(product)

    return responseTemplate('200', 'success', response)
  }
}
