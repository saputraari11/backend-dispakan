import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class CreateProductDto {
  @ApiProperty({
    required: false,
  })
  name: string

  @ApiProperty({
    required: true,
  })
  id_umkm: string

  @ApiProperty({
    required: false,
    default: 0,
  })
  sale: number

  @ApiProperty({
    required: false,
  })
  description: string

  @ApiProperty({
    required: false,
    default: 0,
  })
  price: number

  @ApiProperty({
    required: false,
  })
  @IsNotEmpty()
  category: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  active_on: string

  @ApiProperty({
    type: 'string',
    required: false,
  })
  others: string

  @ApiProperty({
    type: 'array',
    items: {
      type: 'string',
      format: 'binary',
    },
    required: false,
  })
  files: Express.Multer.File[]
}