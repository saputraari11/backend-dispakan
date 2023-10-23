import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

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
  @IsNumber()
  sale: number

  @ApiProperty({
    required: false,
  })
  description: string

  @ApiProperty({
    required: false,
  })
  status: boolean

  @ApiProperty({
    required: false,
    default: 0,
  })
  @IsNumber()
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
  others_description: string

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
