import { IsOptional, IsEnum, IsString, IsNumber } from 'class-validator'
import { UserLevel } from '../user-level.enum'
import { BaseDto } from 'src/commons/base.dto'

export class FilterUserDto extends BaseDto{
  @IsOptional()
  @IsString()
  level: UserLevel
}
