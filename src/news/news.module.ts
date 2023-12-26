import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { News } from './news.entity'
import { NewsController } from './news.controller'
import { NewsService } from './news.service'
import { StorageService } from '../commons/storage/storage.service'
import { Comment } from '../comment/comment.entity'

@Module({
  imports: [TypeOrmModule.forFeature([News, Comment])],
  controllers: [NewsController],
  providers: [NewsService, StorageService],
})
export class NewsModule {}
