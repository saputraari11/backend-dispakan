import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport'
import { LandingPageService } from './landing-page.service'
import { FilterAllProducts } from './dto/filter-all-product.dto'

@ApiTags('Landing Page')
@Controller('landing-page')
export class LandingPageController {
  constructor(private landingPageService: LandingPageService) {}

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async allProductByStore(@Query() filter: FilterAllProducts) {
    console.log(JSON.parse(filter.sort_by));
    const result = await this.landingPageService.allProductByStore()
    return result
  }

}
