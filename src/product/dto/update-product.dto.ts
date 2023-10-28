import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'
import { Transform } from 'class-transformer'

export class UpdateProductDto{
  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  name: string

  @ApiProperty({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  id_umkm: string

  @ApiProperty({
    required: false,
    default: 0,
    minimum:0,
    type:Number
  })
  @Transform(value => Number(value))
  @IsNumber()
  @IsOptional()
  sale: number

  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  description: string

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  status: boolean

  @ApiProperty({
    required: false,
    default: 0,
    minimum:0,
    type:Number
  })
  @Transform(value => Number(value))
  @IsNumber()
  @IsOptional()
  price: number

  @ApiProperty({
    required: false,
  })
  @IsNotEmpty()
  category: string

  @ApiProperty({
    type: 'string',
    required: false,
  })
  @IsString()
  @IsOptional()
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
