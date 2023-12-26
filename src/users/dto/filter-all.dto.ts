import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'
import { BaseDto } from '../../commons/base.dto'

export class FilterUmkmDto extends BaseDto {
  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  search: string
}
