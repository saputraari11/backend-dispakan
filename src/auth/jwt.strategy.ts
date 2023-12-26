import { UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { InjectRepository } from '@nestjs/typeorm'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { User } from '../users/user.entity'
import { AuthService } from './auth.service'
import { JwtPayload } from './jwt-payload.interface'
import { UserLevel } from '../users/user-level.enum'

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secret',
    })
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { email } = payload

    if (!email) throw new Error('Email cannot be null.')

    const user = await User.findOne({ where: { email } })

    if (!user.status && user.level == UserLevel.UMKM) {
      throw new UnauthorizedException('User Is Not Active!')
    }

    if (!user) {
      throw new UnauthorizedException('User Not Found!')
    }

    return user
  }
}
