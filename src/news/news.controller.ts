import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
  Req,
  Res,
  ServiceUnavailableException,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger'
import { FileInterceptor } from '@nestjs/platform-express'
import { CreateNewsDto } from './dto/create-news.dto'
import * as multer from 'multer'
import * as fs from 'fs'
import * as path from 'path'
import { NewsService } from './news.service'
import { Request, Response } from 'express'
import { AuthGuard } from '@nestjs/passport'
import { StorageFile } from 'src/commons/storage/storage-file'
import { StorageService } from 'src/commons/storage/storage.service'
import { FilterAllNews } from './dto/filter-all.dto'

@ApiTags('News')
@Controller('news')
export class NewsController {
  constructor(
    private newsService: NewsService,
    private storageService: StorageService,
  ) {}

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async allNews(@Query() filterDto: FilterAllNews) {
    const result = await this.newsService.allNews(filterDto)
    return result
  }

  @Post('upload')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        files: 1,
        fileSize: 1024 * 1024,
      },
    }),
  )
  async uploadFile(
    @Body() data: CreateNewsDto,
    @UploadedFile('file') file: Express.Multer.File,
  ) {
    data.file = file
    const result = await this.newsService.uploadNews(data)
    return result
  }

  @Post('update/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        files: 1,
        fileSize: 1024 * 1024,
      },
    }),
  )
  async updateFile(
    @Param('id') id: string,
    @Body() data: CreateNewsDto,
    @UploadedFile('file') file: Express.Multer.File,
  ) {
    data.file = file
    const result = await this.newsService.updateNews(data, id)
    return result
  }

  @Get('detail/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async detailNews(@Param('id') id: string) {
    const result = await this.newsService.detailNews(id)
    return result
  }

  @Get('delete/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async deleteNews(@Param('id') id: string) {
    const result = await this.newsService.deleteNews(id)
    return result
  }
}
