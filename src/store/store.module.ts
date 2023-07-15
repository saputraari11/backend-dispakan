import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Store } from './store.entity'
import { StoreService } from './store.service'
import { StoreController } from './store.controller'
import { UsersService } from 'src/users/users.service'
import { User } from 'src/users/user.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Store, User])],
  controllers: [StoreController],
  providers: [StoreService, UsersService],
})
export class StoreModule {}
