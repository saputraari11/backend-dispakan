import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { UsersModule } from '../users/users.module'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from './jwt.strategy'
import { UserRepository } from 'src/users/user.repository'
import { UsersService } from 'src/users/users.service'
import { ApiKeyStrategy } from './apikey.strategy'
import { StorageService } from 'src/commons/storage/storage.service'

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'secret',
    }),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    UsersService,
    UserRepository,
    ApiKeyStrategy,
    StorageService,
  ],
  controllers: [AuthController],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
