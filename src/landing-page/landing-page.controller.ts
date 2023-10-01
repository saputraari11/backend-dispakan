import {
    Controller,
    Get,
    Query,
    UseGuards,
  } from '@nestjs/common'
  import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
  import { AuthGuard } from '@nestjs/passport'
import { FilterStoreDto } from "src/store/dto/filter-all.dto";
import { LandingPageService } from "./landing-page.service";
  
@ApiTags('Landing Page')
@Controller('landing-page')
  export class LandingPageController {
    constructor(private landingPageService: LandingPageService) {}
  
    @Get()
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    async allProductByStore(@Query() request: FilterStoreDto) {
      const result = await this.landingPageService.allProductByStore()
      return result
    }
  
}