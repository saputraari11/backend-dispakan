import { SetMetadata } from '@nestjs/common'
import { UserLevel } from 'src/users/user-level.enum'

export const Roles = (...roles: UserLevel[]) => SetMetadata('roles', roles)
