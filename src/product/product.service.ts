import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Product } from './product.entity'
import { Repository } from 'typeorm'
import { responseTemplate } from 'src/app.utils'
import { CreateProductDto } from './dto/create-product.dto'
import { StoreService } from 'src/store/store.service'
import * as fs from 'fs'

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly storeService: StoreService,
  ) {}
  async allProduct() {
    const products = await this.productRepository.find({
      relations: ['store'],
    })

    for (let item of products) {
      await item.convertStringToArray()
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

    return responseTemplate('200', 'success', product)
  }

  async saveProduct(uploadProduct: CreateProductDto) {
    const {
      categorySaved,
      description,
      files,
      id_umkm,
      name,
      other,
      price,
      sale,
      tipe,
      varian,
    } = uploadProduct
    const umkm = (await this.storeService.detailStore(id_umkm)).data
    const product = new Product()

    product.name = name
    product.price = price
    product.sale = sale
    product.description = description
    product.store = umkm

    if (categorySaved && categorySaved.length != 0)
      product.categorySaved = JSON.stringify(categorySaved)
    if (other && other.length != 0) product.othersSaved = JSON.stringify(other)
    if (tipe && tipe.length != 0) product.typesSaved = JSON.stringify(tipe)
    if (varian && varian.length != 0)
      product.varianSaved = JSON.stringify(varian)

    if (files.length != 0) {
      const filename = files.map(item => item.filename)
      const image = files.map(item => item.path)
      product.filenameSaved = JSON.stringify(filename)
      product.imagesSaved = JSON.stringify(image)
    }

    await product.convertStringToArray()
    await this.productRepository.save(product)
    return responseTemplate('200', 'success', product)
  }

  async updateProduct(updateProduct: CreateProductDto, id: string) {
    const product: Product = (await this.detailProduct(id)).data
    await product.convertStringToArray()
    const {
      categorySaved,
      description,
      files,
      id_umkm,
      name,
      other,
      price,
      sale,
      tipe,
      varian,
    } = updateProduct
    const umkm = (await this.storeService.detailStore(id_umkm)).data

    product.name = name
    product.price = price
    product.sale = sale
    product.description = description
    product.store = umkm

    if (categorySaved && categorySaved.length != 0) {
      product.categorySaved = JSON.stringify(categorySaved)
    } else {
      product.categorySaved = null
    }

    if (other && other.length != 0) {
      product.othersSaved = JSON.stringify(other)
    } else {
      product.othersSaved = null
    }

    if (tipe && tipe.length != 0) {
      product.typesSaved = JSON.stringify(tipe)
    } else {
      product.typesSaved = null
    }

    if (varian && varian.length != 0) {
      product.varianSaved = JSON.stringify(varian)
    } else {
      product.varianSaved = null
    }

    if (files && files.length != 0) {
      if (product.images && product.images.length != 0) {
        product.images.map(item => {
          if (fs.existsSync(item)) {
            fs.unlinkSync(item)
          }
        })
      }

      const filename = files.map(item => item.filename)
      const image = files.map(item => item.path)
      product.filenameSaved = JSON.stringify(filename)
      product.imagesSaved = JSON.stringify(image)
    } else {
      product.filenameSaved = null
      product.imagesSaved = null
    }

    await this.productRepository.save(product)
    await product.convertStringToArray()
    return responseTemplate('200', 'success', product)
  }

  async deleteProduct(id: string) {
    let response = []
    const product: Product = (await this.detailProduct(id)).data
    await product.convertStringToArray()

    if (product.images && product.images.length != 0) {
      product.images.map(item => {
        try {
          if (fs.existsSync(item)) {
            console.log('masuk')

            fs.unlinkSync(item)
            response.push(`${product.createdAt}. ${item} deleted`)
          }
        } catch (e) {
          response.push(`${product.createdAt}. ${item}, ${e.message}`)
        }
      })
    }

    await this.productRepository.remove(product)

    return responseTemplate('200', 'success', response)
  }
}
