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

@ApiTags('Landing Page')
@Controller('landing-page')
export class LandingPageController {
  constructor(private landingPageService: LandingPageService) {}

  @Get()
  @ApiBearerAuth()
  // @UseGuards(AuthGuard('jwt'))
  async allProductByStore(@Query() filter: FilterAllProducts) {
    const result = await this.landingPageService.allProductByStore(filter)
    return result
  }

  @Post('/action')
  @ApiBearerAuth()
  async actionLandingPage(@Body() incrementDto: IncrementDto) {
    return this.landingPageService.incrementProperty(incrementDto)
  }
}
