import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class UpdateNewsDto {
  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  title: string

  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  posted_date: string

  @ApiProperty({
    required: false,
    type: Boolean,
  })
  @IsOptional()
  status: string | boolean

  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  description: string

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  file: Express.Multer.File
}
