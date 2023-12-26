import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersService } from '../users/users.service'
import { User } from '../users/user.entity'
import { StorageService } from '../commons/storage/storage.service'
import { Product } from '../product/product.entity'
import { Store } from '../store/store.entity'
import { LandingPageService } from './landing-page.service'
import { LandingPageController } from './landing-page.controller'
import { ClickProduct } from './click-product.entity'
import { LikeProduct } from './like-product.entity'
import { News } from '../news/news.entity'
import { Comment } from '../comment/comment.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Store,
      User,
      Product,
      ClickProduct,
      LikeProduct,
      News,
      Comment,
    ]),
  ],
  controllers: [LandingPageController],
  providers: [UsersService, StorageService, LandingPageService],
})
export class LandingPageModule {}
