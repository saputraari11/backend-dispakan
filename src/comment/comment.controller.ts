import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
  Req,
  Res,
  ServiceUnavailableException,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger'
import { FileInterceptor } from '@nestjs/platform-express'
import * as multer from 'multer'
import * as fs from 'fs'
import * as path from 'path'
import { Request, Response } from 'express'
import { AuthGuard } from '@nestjs/passport'
import { StorageFile } from 'src/commons/storage/storage-file'
import { StorageService } from 'src/commons/storage/storage.service'
import { CommentService } from './comment.service'
import { FilterAllComment } from './dto/filter-all.dto'
import { CreateCommantDto } from './dto/create-comment.dto'
import { UpdateStatusCommentDto } from './dto/update-status-comment.dto'
import { Roles } from 'src/auth/roles.decorator'
import { UserLevel } from 'src/users/user-level.enum'
import { RolesGuard } from 'src/auth/roles.guard'
import { ThrottlerGuard } from '@nestjs/throttler'

@ApiTags('Comments')
@Controller('comment')
@UseGuards(AuthGuard('jwt'), RolesGuard, ThrottlerGuard)
@Roles(UserLevel.BUMDES)
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Get()
  @ApiBearerAuth()
  async allComment(@Query() filterDto: FilterAllComment) {
    const result = await this.commentService.allComment(filterDto)
    return result
  }

  @Post('update/status/:id')
  @ApiBearerAuth()
  async updateStatus(
    @Param('id') id: string,
    @Body() data: UpdateStatusCommentDto,
  ) {
    const result = await this.commentService.updateStatus(data, id)
    return result
  }

  @Post('update/:id')
  @ApiBearerAuth()
  async updateComment(@Param('id') id: string, @Body() data: CreateCommantDto) {
    const result = await this.commentService.updateComment(data, id)
    return result
  }

  @Get('detail/:id')
  @ApiBearerAuth()
  async detailComment(@Param('id') id: string) {
    const result = await this.commentService.detailComment(id)
    return result
  }

  @Get('delete/:id')
  @ApiBearerAuth()
  async deleteComment(@Param('id') id: string) {
    const result = await this.commentService.deleteComment(id)
    return result
  }
}
