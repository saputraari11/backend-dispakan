import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'
import { BaseDto } from 'src/commons/base.dto'

export class FilterAllProducts extends BaseDto {
  @ApiProperty({
    required: false,
  })
  @IsString()
  search: string

  @ApiProperty({
    required: false,
  })
  @IsString()
  sort_by: string

  @ApiProperty({
    required: false,
  })
  @IsString()
  catagory: string
}
