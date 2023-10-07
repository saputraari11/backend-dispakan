import { Inject } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm'
import databaseConfig from '../config/database.config'

import { User } from '../users/user.entity'
import { Product } from 'src/product/product.entity'
import { Store } from 'src/store/store.entity'
import { Comment } from 'src/comment/comment.entity'
import { News } from 'src/news/news.entity'
import { ClickProduct } from 'src/landing-page/click-product.entity'
import { LikeProduct } from 'src/landing-page/like-product.entity'

export class DatabaseConfig implements TypeOrmOptionsFactory {
  constructor(
    @Inject(databaseConfig.KEY)
    private config: ConfigType<typeof databaseConfig>,
  ) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      ...this.config,
      type: 'postgres',
      entities: [User, Product, Store, News, Comment,ClickProduct,LikeProduct],
      ssl: true,
    }
  }
}
