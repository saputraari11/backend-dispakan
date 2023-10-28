import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { UsersService } from '../users/users.service'
import { UserLevel } from 'src/users/user-level.enum'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.getAllAndOverride<UserLevel[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ])
    const request = context.switchToHttp().getRequest()
    const userRequest = request.user

    return roles.includes(userRequest.level)
  }
}
