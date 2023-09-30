import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CommentService } from './comment.service'
import { News } from 'src/news/news.entity'
import { CommentController } from './comment.controller'
import { Comment } from './comment.entity'
import { NewsService } from 'src/news/news.service'
import { StorageService } from 'src/commons/storage/storage.service'

@Module({
  imports: [TypeOrmModule.forFeature([News,Comment])],
  controllers: [CommentController],
  providers: [CommentService,NewsService,StorageService],
})
export class CommentModule {}

