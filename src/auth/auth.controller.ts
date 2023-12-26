import {
  BadRequestException,
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import {
  ApiBadRequestResponse,
  ApiBasicAuth,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger'
import { UserLevel } from '../users/user-level.enum'
import { SETTINGS } from '../app.utils'
import { User } from '../users/user.entity'
import { AuthService } from './auth.service'
import { SignupCredentialsDto } from './dto/signup-credentials.dto'
import { SignInDto } from './dto/signin.dto'
import { Request } from 'express'
import { ThrottlerGuard } from '@nestjs/throttler'

@ApiTags('Auth')
@Controller('auth')
@UseGuards(ThrottlerGuard)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  async signin(
    @Body(SETTINGS.VALIDATION_PIPE)
    signInCredentialsDto: SignInDto,
  ) {
    try {
      return this.authService.signIn(signInCredentialsDto)
    } catch (err) {
      return err
    }
  }

  @Post('signup/bumdes')
  @ApiSecurity('X-API-KEY', ['X-API-KEY'])
  async signUp(
    @Body(SETTINGS.VALIDATION_PIPE)
    signUpCredentialsDto: SignupCredentialsDto,
  ): Promise<User> {
    const data = await this.authService.signUp(signUpCredentialsDto)
    return data
  }

  @Post('signup/owner-umkm')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async signUpUser(
    @Body(SETTINGS.VALIDATION_PIPE)
    signUpCredentialsDto: SignupCredentialsDto,
    @Req() request: Request,
  ): Promise<User> {
    signUpCredentialsDto.createdBy = request.user
    return await this.authService.signUp(signUpCredentialsDto, UserLevel.UMKM)
  }
}
