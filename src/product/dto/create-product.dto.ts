import { ApiProperty } from '@nestjs/swagger'

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
    isArray: true,
    type: String,
  })
  categorySaved: string[]

  @ApiProperty({
    isArray: true,
    required: false,
    type: String,
  })
  other: string[]

  @ApiProperty({
    isArray: true,
    required: false,
    type: String,
  })
  varian: string[]

  @ApiProperty({
    isArray: true,
    required: false,
    type: String,
  })
  tipe: string[]

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
