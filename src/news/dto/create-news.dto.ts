import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator'

export class CreateNewsDto {
  @ApiProperty({
    required: false,
  })
  title: string

  @ApiProperty({
    required: false,
  })
  posted_date: string

  @ApiProperty({
    required: false,
    type:Boolean
  })
  status: boolean

  @ApiProperty({
    required: false,
  })
  description: string

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  file: Express.Multer.File
}
