import { ApiProperty } from '@nestjs/swagger'

export class IncrementDto {
  @ApiProperty({
    required: false,
  })
  increment_type: string

  @ApiProperty({
    required: false,
  })
  identifier: string

  @ApiProperty({
    required: false,
  })
  id_product: string
}
