import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport'
import { LandingPageService } from './landing-page.service'
import { FilterAllProducts } from './dto/filter-all-product.dto'
import { IncrementDto } from './dto/increment.dto'
import { CreateCommantDto } from 'src/comment/dto/create-comment.dto'
import { FilterAllNews } from 'src/news/dto/filter-all.dto'

@Controller('landing-page')
export class LandingPageController {
  constructor(private landingPageService: LandingPageService) {}

  @Get('product')
  @ApiTags('Landing Page')
  @ApiBearerAuth()
  // @UseGuards(AuthGuard('jwt'))
  async allProductByStore(@Query() filter: FilterAllProducts) {
    const result = await this.landingPageService.allProductByStore(filter)
    return result
  }

  @Get('product/detail/:id')
  @ApiTags('Landing Page')
  @ApiBearerAuth()
  async detailProdcut(@Param('id') id: string) {
    const result = await this.landingPageService.detailProduct(id)
    return result
  }

  @Post('/action')
  @ApiTags('Landing Page')
  @ApiBearerAuth()
  async actionLandingPage(@Body() incrementDto: IncrementDto) {
    return this.landingPageService.incrementProperty(incrementDto)
  }

  @Get('news')
  @ApiTags('Landing Page')
  @ApiBearerAuth()
  async allNews(@Query() filterDto: FilterAllNews) {
    const result = await this.landingPageService.allNews(filterDto)
    return result
  }

  @Get('news/detail/:id')
  @ApiTags('Landing Page')
  @ApiBearerAuth()
  async detailNews(@Param('id') id: string) {
    const result = await this.landingPageService.detailNews(id)
    return result
  }

  @Post('news/comment')
  @ApiTags('Landing Page')
  @ApiBearerAuth()
  async uploadFile(@Body() data: CreateCommantDto) {
    const result = await this.landingPageService.uploadComment(data)
    return result
  }

  @Get('bumdes/dashboard')
  @ApiTags('dashboard')
  @ApiBearerAuth()
  async getBumdes(@Query() data: FilterAllProducts) {
    const result = await this.landingPageService.getBumdesDashboard(
      data.active_on,
    )
    return result
  }

  @Get('umkm/dashboard')
  @ApiTags('dashboard')
  @ApiBearerAuth()
  async getUmkm(@Query() data: FilterAllProducts) {
    const result = await this.landingPageService.getUmkmDashboard(
      data.active_on,
    )
    return result
  }
}
