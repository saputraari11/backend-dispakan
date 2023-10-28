import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common'
import { ApiBearerAuth, ApiSecurity, ApiTags } from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport'
import { LandingPageService } from './landing-page.service'
import { FilterAllProducts } from './dto/filter-all-product.dto'
import { IncrementDto } from './dto/increment.dto'
import { CreateCommantDto } from 'src/comment/dto/create-comment.dto'
import { FilterAllNews } from 'src/news/dto/filter-all.dto'
import { Roles } from 'src/auth/roles.decorator'
import { RolesGuard } from 'src/auth/roles.guard'
import { UserLevel } from 'src/users/user-level.enum'
import { BaseDto } from 'src/commons/base.dto'
import { ThrottlerGuard } from '@nestjs/throttler'

@Controller('landing-page')
@UseGuards(ThrottlerGuard)
export class LandingPageController {
  constructor(private landingPageService: LandingPageService) {}

  @Get('product')
  @ApiTags('landing page')
  @ApiSecurity('X-API-KEY', ['X-API-KEY'])
  async allProductByStore(@Query() filter: FilterAllProducts) {
    const result = await this.landingPageService.allProductByStore(filter)
    return result
  }

  @Get('product/detail/:id')
  @ApiTags('landing page')
  @ApiSecurity('X-API-KEY', ['X-API-KEY'])
  async detailProdcut(@Param('id') id: string) {
    const result = await this.landingPageService.detailProduct(id)
    return result
  }

  @Post('/action')
  @ApiTags('landing page')
  @ApiSecurity('X-API-KEY', ['X-API-KEY'])
  async actionLandingPage(@Body() incrementDto: IncrementDto) {
    return this.landingPageService.incrementProperty(incrementDto)
  }

  @Get('news')
  @ApiTags('landing page')
  @ApiSecurity('X-API-KEY', ['X-API-KEY'])
  async allNews(@Query() filterDto: FilterAllNews) {
    const result = await this.landingPageService.allNews(filterDto)
    return result
  }

  @Get('news/detail/:id')
  @ApiTags('landing page')
  @ApiSecurity('X-API-KEY', ['X-API-KEY'])
  async detailNews(@Param('id') id: string) {
    const result = await this.landingPageService.detailNews(id)
    return result
  }

  @Post('news/comment')
  @ApiTags('landing page')
  @ApiSecurity('X-API-KEY', ['X-API-KEY'])
  async uploadFile(@Body() data: CreateCommantDto) {
    const result = await this.landingPageService.uploadComment(data)
    return result
  }

  @Get('bumdes/dashboard')
  @ApiTags('dashboard')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserLevel.BUMDES)
  async getBumdes(@Query() data: BaseDto) {
    const result = await this.landingPageService.getBumdesDashboard(
      data.active_on,
    )
    return result
  }

  @Get('umkm/dashboard')
  @ApiTags('dashboard')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserLevel.UMKM)
  async getUmkm(@Query() data: BaseDto) {
    const result = await this.landingPageService.getUmkmDashboard(
      data.active_on,
    )
    return result
  }
}
