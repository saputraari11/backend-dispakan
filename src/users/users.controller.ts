import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common'
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger'
import { UsersService } from './users.service'
import { Request, Response } from 'express'
import { AuthGuard } from '@nestjs/passport'
import { UpdateProfileDto } from './dto/update-profile.dto'
import { responseTemplate } from '../app.utils'
import * as multer from 'multer'
import * as fs from 'fs'
import * as path from 'path'
import { FileInterceptor } from '@nestjs/platform-express'
import { BumdesProfileDto } from './dto/bumdes-profile.dto'
import { UpdatePasswordDto } from './dto/update-password.dto'
import { UpdateStatusDto } from './dto/update-status.dto'
import { FilterUmkmDto } from './dto/filter-all.dto'
import { RolesGuard } from '../auth/roles.guard'
import { UserLevel } from './user-level.enum'
import { Roles } from '../auth/roles.decorator'
import { ThrottlerGuard } from '@nestjs/throttler'

let dir = `public/dispakan/assets/bumdes`
dir = path.join(__dirname, '..', '..', '..', '..', '..', dir)

@ApiTags('User')
@Controller('user')
@UseGuards(AuthGuard('jwt'), RolesGuard, ThrottlerGuard)
@Roles(UserLevel.BUMDES)
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('umkm')
  @ApiBearerAuth()
  async allUmkm(@Query() filterAllUmkm: FilterUmkmDto) {
    const result = await this.userService.userUmkm(filterAllUmkm)
    return result
  }

  @Get('bumdes')
  @ApiBearerAuth()
  async allBumdes(@Query() filterAllUmkm: FilterUmkmDto) {
    const result = await this.userService.userBumdes(filterAllUmkm)
    return result
  }

  @Get('detail/:id')
  @ApiBearerAuth()
  @Roles(UserLevel.BUMDES, UserLevel.UMKM)
  async detailUser(@Param('id') id: string, @Req() request: Request) {
    const protocol = request.protocol
    const hostname = request.headers.host
    const url = `${protocol}://${hostname}/bumdes/profile/image`
    const result = await this.userService.userDetail(id, url)
    return responseTemplate('200', 'success', result)
  }

  @Get('delete-umkm/:id')
  @ApiBearerAuth()
  async deleteUmkm(@Param('id') id: string) {
    const result = await this.userService.deleteUmkm(id)
    return result
  }

  @Post('umkm/profil')
  @ApiBearerAuth()
  async updateProfilUmkm(@Body() body: UpdateProfileDto) {
    const result = await this.userService.updateProfile(body)
    return result
  }

  @Post('bumdes/profil')
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
  async updateProfilBumdes(
    @Body() body: BumdesProfileDto,
    @UploadedFile('file') file: Express.Multer.File,
  ) {
    body.file = file
    const result = await this.userService.updateBumdes(body)
    return result
  }

  @Post('update/password/:id')
  @ApiBearerAuth()
  async updatePassword(
    @Body() body: UpdatePasswordDto,
    @Param('id') id: string,
  ) {
    body.id_user = id
    const result = await this.userService.updatePassword(body)
    return result
  }

  @Post('update/status/:id')
  @ApiBearerAuth()
  async updateStatus(@Body() body: UpdateStatusDto, @Param('id') id: string) {
    const result = await this.userService.updateStatus(body, id)
    return result
  }
}
