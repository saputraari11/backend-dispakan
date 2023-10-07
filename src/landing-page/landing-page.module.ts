import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersService } from 'src/users/users.service'
import { User } from 'src/users/user.entity'
import { StorageService } from 'src/commons/storage/storage.service'
import { Product } from 'src/product/product.entity'
import { Store } from 'src/store/store.entity'
import { LandingPageService } from './landing-page.service'
import { LandingPageController } from './landing-page.controller'
import { ClickProduct } from './click-product.entity'
import { LikeProduct } from './like-product.entity'
import { News } from 'src/news/news.entity'
import { Comment } from 'src/comment/comment.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([Store, User, Product, ClickProduct, LikeProduct,News,Comment]),
  ],
  controllers: [LandingPageController],
  providers: [UsersService, StorageService, LandingPageService],
})
export class LandingPageModule {}
