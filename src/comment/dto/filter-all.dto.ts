import { ApiProperty } from '@nestjs/swagger'

export class FilterAllComment {
  @ApiProperty({
    required: false,
  })
  search: string

  @ApiProperty({
    required: false,
  })
  active_on: string

  @ApiProperty({
    required: false,
  })
  id_news: string

  @ApiProperty({
    required: false,
  })
  status: string
}
