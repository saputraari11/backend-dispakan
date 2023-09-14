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
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger'
import { FileInterceptor } from '@nestjs/platform-express'
import * as multer from 'multer'
import * as fs from 'fs'
import * as path from 'path'
import { Request, Response } from 'express'
import { AuthGuard } from '@nestjs/passport'
import { StoreService } from './store.service'
import { CreateStoreDto } from './dto/create-store.dto'
import { responseTemplate } from 'src/app.utils'

let dir = `public/dispakan/assets/store`
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

@ApiTags('UMKM')
@Controller('store')
export class StoreController {
  constructor(private storeService: StoreService) {}

  @Get()
  @ApiBearerAuth()
  // @UseGuards(AuthGuard('jwt'))
  async allStore(@Req() request: Request) {
    const protocol = request.protocol
    const hostname = request.headers.host
    const pathname = request.path
    const url = `${protocol}://${hostname}${pathname}/image`
    const result = await this.storeService.allStore(url)
    return result
  }

  @Post('upload')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: storage,
    }),
  )
  async uploadFile(
    @Body() data: CreateStoreDto,
    @UploadedFile('file') file: Express.Multer.File,
  ) {
    data.file = file
    const result = await this.storeService.uploadStore(data)
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
    @Body() data: CreateStoreDto,
    @UploadedFile('file') file: Express.Multer.File,
  ) {
    data.file = file
    const result = await this.storeService.updateStore(data, id)
    return result
  }

  @Get('detail/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async detailStore(@Param('id') id: string, @Req() request: Request) {
    const protocol = request.protocol
    const hostname = request.headers.host
    const url = `${protocol}://${hostname}/store/image`
    const result = await this.storeService.detailStore(id, url)
    return result
  }

  @Get('delete/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async deleteStore(@Param('id') id: string) {
    const result = await this.storeService.deleteStore(id)
    return result
  }

  @Get(':img')
  @ApiBearerAuth()
  seeFile(@Param('img') image: string, @Res() res: Response) {
    if (!fs.existsSync(`${dir}/${image}`)) {
      return res.send(
        responseTemplate('400', "Failed file didn't exist", {}, true),
      )
    } else {
      return res.sendFile(image, { root: dir })
    }
  }
}
