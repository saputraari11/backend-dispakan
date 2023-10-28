import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator'
import { BaseDto } from 'src/commons/base.dto'

export class CreateNewsDto extends BaseDto{
  @ApiProperty({
    required: false,
  })
  @IsString()
  title: string

  @ApiProperty({
    required: false,
  })
  @IsString()
  posted_date: string

  @ApiProperty({
    required: false,
    type: Boolean,
  })
  @IsString()
  status: string | boolean

  @ApiProperty({
    required: false,
  })
  @IsString()
  description: string

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  file: Express.Multer.File
}
