import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class CreateStoreDto {
  @ApiProperty({
    required: false,
  })
  name: string

  @ApiProperty({
    required: true,
  })
  id_owner: string

  @ApiProperty({
    required: false,
  })
  address: string

  @ApiProperty({
    required: false,
  })
  phone: string

  @ApiProperty({
    required: false,
  })
  aspek: string

  @ApiProperty({
    required: false,
    isArray: true,
    type: String,
  })
  category: string[]

  @ApiProperty({
    isArray: true,
    required: false,
    type: String,
  })
  mediaOrder: string[]

  @ApiProperty({
    isArray: true,
    required: false,
    type: String,
  })
  mediaContact: string[]

  @ApiProperty({
    required: false,
  })
  omset: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  active_on: string

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  file: Express.Multer.File
}
