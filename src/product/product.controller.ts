import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger'
import { ProductService } from './product.service'
import * as multer from 'multer'
import * as fs from 'fs'
import * as path from 'path'
import { AuthGuard } from '@nestjs/passport'
import { FilesInterceptor } from '@nestjs/platform-express'
import { CreateProductDto } from './dto/create-product.dto'
import { Request, Response, response } from 'express'
import { responseTemplate } from 'src/app.utils'
import { FilterAllProducts } from './dto/filter-all.dto'

const os = require('os')
const dir = `public/dispakan/assets/product`

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

@ApiTags('Product UMKM')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('upload')
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(
    FilesInterceptor('files', 24, {
      limits: {
        files: 24,
        fileSize: 1024 * 1024,
      },
    }),
  )
  createProduct(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() uploadsDto: CreateProductDto,
  ) {
    uploadsDto.files = files
    return this.productService.saveProduct(uploadsDto)
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async allProduct(@Query() filterDto: FilterAllProducts) {
    const result = await this.productService.allProduct(filterDto)
    return result
  }

  @Post('update/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FilesInterceptor('files', 24, {
      limits: {
        files: 24,
        fileSize: 1024 * 1024,
      },
    }),
  )
  async updateProduct(
    @Param('id') id: string,
    @Body() data: CreateProductDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    data.files = files
    const result = await this.productService.updateProduct(data, id)
    return result
  }

  @Get('detail/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async detailProdcut(@Param('id') id: string, @Req() request: Request) {
    const result = await this.productService.detailProduct(id)
    return result
  }

  @Get('delete/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async deleteProduct(@Param('id') id: string) {
    const result = await this.productService.deleteProduct(id)
    return result
  }
}
