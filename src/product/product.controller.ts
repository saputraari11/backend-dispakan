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
import { AuthGuard } from '@nestjs/passport'
import { FilesInterceptor } from '@nestjs/platform-express'
import { CreateProductDto } from './dto/create-product.dto'
import { Request } from 'express'
import { FilterAllProducts } from './dto/filter-all.dto'
import { RolesGuard } from 'src/auth/roles.guard'
import { UserLevel } from 'src/users/user-level.enum'
import { Roles } from 'src/auth/roles.decorator'
import { ThrottlerGuard } from '@nestjs/throttler'
import { UpdateProductDto } from './dto/update-product.dto'

@ApiTags('Product UMKM')
@Controller('product')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(UserLevel.BUMDES)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('upload')
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserLevel.UMKM)
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
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserLevel.BUMDES, UserLevel.UMKM)
  async allProduct(@Query() filterDto: FilterAllProducts) {
    const result = await this.productService.allProduct(filterDto)
    return result
  }

  @Post('update/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard, ThrottlerGuard)
  @Roles(UserLevel.UMKM)
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
    @Body() data: UpdateProductDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    data.files = files
    const result = await this.productService.updateProduct(data, id)
    return result
  }

  @Get('detail/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserLevel.BUMDES, UserLevel.UMKM)
  async detailProdcut(@Param('id') id: string, @Req() request: Request) {
    const result = await this.productService.detailProduct(id)
    return result
  }

  @Get('delete/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserLevel.UMKM)
  async deleteProduct(@Param('id') id: string) {
    const result = await this.productService.deleteProduct(id)
    return result
  }
}
