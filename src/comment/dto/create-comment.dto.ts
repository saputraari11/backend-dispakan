import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator'
import { BaseDto } from 'src/commons/base.dto'

export class CreateCommantDto extends BaseDto {
  @ApiProperty({
    required: false,
  })
  @IsString()
  name: string

  @ApiProperty({
    required: false,
  })
  @IsString()
  description: string

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  id_news: string

  @ApiProperty({
    required: false,
  })
  @IsString()
  periode: string
}
