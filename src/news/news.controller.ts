import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger'
import { FileInterceptor } from '@nestjs/platform-express'
import { CreateNewsDto } from './dto/create-news.dto'
import { NewsService } from './news.service'
import { AuthGuard } from '@nestjs/passport'
import { FilterAllNews } from './dto/filter-all.dto'
import { Roles } from '../auth/roles.decorator'
import { UserLevel } from '../users/user-level.enum'
import { RolesGuard } from '../auth/roles.guard'
import { ThrottlerGuard } from '@nestjs/throttler'
import { UpdateNewsDto } from './dto/update-news.dto'

@ApiTags('News')
@Controller('news')
@UseGuards(AuthGuard('jwt'), RolesGuard, ThrottlerGuard)
@Roles(UserLevel.BUMDES)
export class NewsController {
  constructor(private newsService: NewsService) {}

  @Get()
  @ApiBearerAuth()
  async allNews(@Query() filterDto: FilterAllNews) {
    const result = await this.newsService.allNews(filterDto)
    return result
  }

  @Post('upload')
  @ApiBearerAuth()
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
    @Body() data: UpdateNewsDto,
    @UploadedFile('file') file: Express.Multer.File,
  ) {
    data.file = file
    const result = await this.newsService.updateNews(data, id)
    return result
  }

  @Get('detail/:id')
  @ApiBearerAuth()
  async detailNews(@Param('id') id: string) {
    const result = await this.newsService.detailNews(id)
    return result
  }

  @Get('delete/:id')
  @ApiBearerAuth()
  async deleteNews(@Param('id') id: string) {
    const result = await this.newsService.deleteNews(id)
    return result
  }
}
