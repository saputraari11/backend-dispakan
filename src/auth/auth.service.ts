import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UserLevel } from 'src/users/user-level.enum'
import { UserRepository } from 'src/users/user.repository'
import { User } from '../users/user.entity'
import { SignupCredentialsDto } from './dto/signup-credentials.dto'
import { JwtPayload } from './jwt-payload.interface'
import { ConfigService } from '@nestjs/config'
import { SignInDto } from './dto/signin.dto'
import { responseTemplate } from 'src/app.utils'
import { BadRequestError } from 'passport-headerapikey'

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userRepository: UserRepository,
    private configService: ConfigService,
  ) {}
  private apiKeys: string[] = ['admin2023']

  generateToken(user: User) {
    const payload: JwtPayload = {
      email: user.email,
      level: user.level,
      uuid: user.id,
    }

    return {
      access_token: this.jwtService.sign(payload),
    }
  }

  async signIn(userLogin: SignInDto) {
    const user = await this.validate(
      userLogin.email,
      userLogin.password,
      userLogin.active_on,
    )

    if (!user) {
      return responseTemplate(
        '400',
        'Email or Password is not found!',
        {},
        true,
      )
    }

    const token = this.generateToken(user)
    const data = {
      user,
      ...token,
    }

    return responseTemplate('200', 'success', data)
  }

  async signUp(
    userRegister: SignupCredentialsDto,
    level: UserLevel = UserLevel.BUMDES,
  ): Promise<User> {
    const userExist = await User.findOne({
      where: { email: userRegister.email, active_on: userRegister.active_on },
    })

    let user = new User()
    userRegister.level = level

    if (userExist) {
      throw new ConflictException('User is Already Exist!')
    }

    try {
      user = await this.userRepository.signup(userRegister)
    } catch (err) {
      console.log('error query', err)
      return err
    }

      return user
  }

  async validate(username: string, password: string, active_on: string) {
    const user = await User.getRepository()
      .createQueryBuilder('user')
      .where('user.email = :email', {
        email: username,
      })
      .andWhere('user.active_on = :activeOn', { activeOn: active_on })
      .getOne()

    console.log(active_on)

    if (user && (await user.validatePassword(password))) {
      return user
    } else {
      return null
    }
  }

  validateApiKey(apiKey: string) {
    return this.apiKeys.find(apiK => apiKey === apiK)
  }
}
