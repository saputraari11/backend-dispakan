import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { responseTemplate } from 'src/app.utils'
import * as fs from 'fs'
import { v4 } from 'uuid'
import { Product } from 'src/product/product.entity'
import { Store } from 'src/store/store.entity'

@Injectable()
export class LandingPageService {
  constructor(
    @InjectRepository(Store)
    private readonly storeRepository: Repository<Store>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async allProductByStore() {}
}
