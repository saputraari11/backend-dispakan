import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'
import { BaseDto } from 'src/commons/base.dto'

export class FilterAllComment extends BaseDto {
  @ApiProperty({
    required: false,
  })
  @IsString()
  search: string

  @ApiProperty({
    required: false,
  })
  @IsString()
  id_news: string

  @ApiProperty({
    required: false,
  })
  @IsString()
  status: string
}
