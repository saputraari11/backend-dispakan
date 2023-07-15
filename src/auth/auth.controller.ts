import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import {
  ApiBadRequestResponse,
  ApiBasicAuth,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger'
import { UserLevel } from 'src/users/user-level.enum'
import { SETTINGS } from '../app.utils'
import { User } from '../users/user.entity'
import { AuthService } from './auth.service'
import { SignupCredentialsDto } from './dto/signup-credentials.dto'
import { SignInDto } from './dto/signin.dto'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  @UseGuards(AuthGuard('local'))
  async signin(
    @Body(SETTINGS.VALIDATION_PIPE)
    signInCredentialsDto: SignInDto,
  ) {
    return this.authService.signIn(signInCredentialsDto)
  }

  @Post('signup/bumdes')
  @ApiSecurity('X-API-KEY',["X-API-KEY"])
  async signUp(
    @Body(SETTINGS.VALIDATION_PIPE)
    signUpCredentialsDto: SignupCredentialsDto,
  ): Promise<User> {
    return await this.authService.signUp(signUpCredentialsDto)
  }

  @Post('signup/owner-umkm')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async signUpUser(
    @Body(SETTINGS.VALIDATION_PIPE)
    signUpCredentialsDto: SignupCredentialsDto,
  ): Promise<User> {
    return await this.authService.signUp(signUpCredentialsDto, UserLevel.UMKM)
  }
}
