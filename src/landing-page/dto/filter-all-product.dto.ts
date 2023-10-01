import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsObject } from 'class-validator'

export class SortedBy {
  @ApiProperty({
    required: false,
  })
  description: boolean

  @ApiProperty({ required: false })
  like: boolean
}

export class FilterAllProducts {
  @ApiProperty({
    required: false,
  })
  search: string

  @ApiProperty({
    required: false,
  })
  @IsObject()
  sort_by: string

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  active_on: string
}
