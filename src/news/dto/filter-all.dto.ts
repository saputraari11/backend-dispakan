import { ApiProperty } from '@nestjs/swagger'

export class FilterAllNews {
  @ApiProperty({
    required: false,
  })
  search: string

  @ApiProperty({
    required: false,
  })
  active_on: string
}
