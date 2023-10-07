import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsObject } from 'class-validator'

export class FilterAllProducts {
  @ApiProperty({
    required: false,
  })
  search: string

  @ApiProperty({
    required: false,
  })
  sort_by: string

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  active_on: string

  @ApiProperty({
    required: false,
  })
  @IsNotEmpty()
  catagory: string
}
