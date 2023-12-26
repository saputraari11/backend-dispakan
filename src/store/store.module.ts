import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Store } from './store.entity'
import { StoreService } from './store.service'
import { StoreController } from './store.controller'
import { UsersService } from '../users/users.service'
import { User } from '../users/user.entity'
import { StorageService } from '../commons/storage/storage.service'
import { Product } from '../product/product.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Store, User, Product])],
  controllers: [StoreController],
  providers: [StoreService, UsersService, StorageService],
})
export class StoreModule {}
