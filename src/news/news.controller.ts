import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
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

let dir = `public/dispakan/assets/news`
dir = path.join(__dirname, '..', '..', '..', '..', '..', dir)

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }

    cb(null, dir)
  },

  filename: function(req, file, cb) {
    cb(null, Date.now() + '-' + path.basename(file.originalname))
  },
})

@ApiTags('News')
@Controller('news')
export class NewsController {
  constructor(private newsService: NewsService) {}

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async allNews(@Req() request: Request) {
    const protocol = request.protocol
    const hostname = request.headers.host
    const pathname = request.path
    const url = `${protocol}://${hostname}${pathname}/image`
    const result = await this.newsService.allNews(url)
    return result
  }

  @Post('upload')
  @ApiBearerAuth()
  // @UseGuards(AuthGuard('jwt'))
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: storage,
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
      storage: storage,
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
  async detailNews(@Param('id') id: string, @Req() request: Request) {
    const protocol = request.protocol
    const hostname = request.headers.host
    const url = `${protocol}://${hostname}/news/image`
    const result = await this.newsService.detailNews(id, url)
    return result
  }

  @Get('delete/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async deleteNews(@Param('id') id: string) {
    const result = await this.newsService.deleteNews(id)
    return result
  }

  @Get('image/:img')
  seeFile(@Param('img') image: string, @Res() res: Response) {
    if (!fs.existsSync(`${dir}/${image}`)) {
      return res.status(404).send('Image not Found!')
    }
    return res.sendFile(image, { root: dir })
  }
}
