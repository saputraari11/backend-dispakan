import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator'

export class UpdateStoreDto{
  @ApiProperty({
    required: false,
  })
  @IsString()
  name: string

  @ApiProperty({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  id_owner: string

  @ApiProperty({
    required: false,
  })
  @IsString()
  address: string

  @ApiProperty({
    required: false,
  })
  @IsString()
  phone: string

  @ApiProperty({
    required: false,
  })
  status: string | boolean

  @ApiProperty({
    required: false,
  })
  @IsString()
  aspek: string

  @ApiProperty({
    required: false,
    isArray: true,
    type: String,
  })
  @IsString()
  category: string[]

  @ApiProperty({
    isArray: true,
    required: false,
    type: String,
  })
  @IsString()
  mediaOrder: string[]

  @ApiProperty({
    isArray: true,
    required: false,
    type: String,
  })
  @IsString()
  mediaContact: string[]

  @ApiProperty({
    required: false,
  })
  @IsString()
  omset: string

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  file: Express.Multer.File
}
