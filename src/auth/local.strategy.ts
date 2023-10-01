import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import { AuthService } from './auth.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super()
  }

  async validate(
    username: string,
    password: string,
    active_on: string,
  ): Promise<any> {
    const user = await this.authService.validate(username, password, active_on)

    if (!user) {
      throw new UnauthorizedException(
        'The username or password you entered is incorrect',
      )
    }

    return user
  }
}
