import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, IsEnum, IsBoolean } from 'class-validator'

export class BumdesProfileDto {
  @ApiProperty({
    required: true,
  })
  id_bumdes_umkm: string

  @ApiProperty({
    required: false,
  })
  @IsString()
  name: string

  @ApiProperty({
    required: false,
  })
  @IsString()
  address: string

  @ApiProperty({
    required: false,
  })
  phone: string

  @ApiProperty({
    required: false,
  })
  status: boolean

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  file: Express.Multer.File
}
