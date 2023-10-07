import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsUUID } from 'class-validator'

export class IncrementDto {
  @ApiProperty({
    required: false,
  })
  @IsNotEmpty()
  increment_type: string

  @ApiProperty({
    required: false,
  })
  @IsNotEmpty()
  @IsUUID('all', { each: true })
  identifier: string

  @ApiProperty({
    required: false,
  })
  @IsNotEmpty()
  @IsUUID('all', { each: true })
  id_product: string
}
