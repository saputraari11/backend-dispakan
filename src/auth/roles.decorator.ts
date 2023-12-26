import { SetMetadata } from '@nestjs/common'
import { UserLevel } from '../users/user-level.enum'

export const Roles = (...roles: UserLevel[]) => SetMetadata('roles', roles)
