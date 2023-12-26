import { Module } from '@nestjs/common'
import { ProductService } from './product.service'
import { ProductController } from './product.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Product } from './product.entity'
import { Store } from '../store/store.entity'
import { User } from '../users/user.entity'
import { StoreService } from '../store/store.service'
import { UsersService } from '../users/users.service'
import { StorageService } from '../commons/storage/storage.service'

@Module({
  imports: [TypeOrmModule.forFeature([Product, Store, User])],
  providers: [ProductService, StoreService, UsersService, StorageService],
  controllers: [ProductController],
})
export class ProductModule {}
