import { Module } from '@nestjs/common'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserRepository } from './user.repository'
import { StorageService } from '../commons/storage/storage.service'

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository]), StorageService],
  controllers: [UsersController],
  providers: [UsersService, StorageService],
  exports: [UsersService, StorageService],
})
export class UsersModule {}
