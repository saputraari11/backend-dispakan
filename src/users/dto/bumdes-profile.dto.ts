import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, IsEnum, IsBoolean } from 'class-validator'

export class BumdesProfileDto {
  @ApiProperty({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  id_bumdes_umkm: string

  @ApiProperty({
    required: false,
  })
  @IsString()
  name?: string

  @ApiProperty({
    required: false,
  })
  @IsString()
  address?: string

  @ApiProperty({
    required: false,
  })
  @IsString()
  phone?: string

  @ApiProperty({
    required: false,
    type: 'string',
  })
  status?: string

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  file: Express.Multer.File
}
