import { Module } from '@nestjs/common'
import { ProductService } from './product.service'
import { ProductController } from './product.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Product } from './product.entity'
import { Store } from 'src/store/store.entity'
import { User } from 'src/users/user.entity'
import { StoreService } from 'src/store/store.service'
import { UsersService } from 'src/users/users.service'

@Module({
  imports: [TypeOrmModule.forFeature([Product, Store, User])],
  providers: [ProductService, StoreService, UsersService],
  controllers: [ProductController],
})
export class ProductModule {}
