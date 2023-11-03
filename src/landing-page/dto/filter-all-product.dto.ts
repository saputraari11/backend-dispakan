import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'
import { BaseDto } from 'src/commons/base.dto'

export class FilterAllProducts extends BaseDto {
  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  search: string

  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  sort_by: string

  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  catagory: string
}
