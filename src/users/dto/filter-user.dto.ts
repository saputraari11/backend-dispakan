import { IsOptional, IsEnum } from 'class-validator'
import { UserLevel } from '../user-level.enum'

export class FilterUserDto {
  @IsOptional()
  level: UserLevel

  @IsOptional()
  page: number

  @IsOptional()
  limit: number
}
