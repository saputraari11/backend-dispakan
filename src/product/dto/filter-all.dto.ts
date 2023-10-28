import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { BaseDto } from 'src/commons/base.dto'

export class FilterAllProducts extends BaseDto{
  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  search: string
}