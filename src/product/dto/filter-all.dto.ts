import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class FilterAllProducts {
  @ApiProperty({
    required: false,
  })
  search: string

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  active_on: string
}
