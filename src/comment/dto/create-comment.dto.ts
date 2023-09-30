import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator'

export class CreateCommantDto {
  @ApiProperty({
    required: false,
  })
  name: string

  @ApiProperty({
    required: false,
  })
  description: string

  @ApiProperty({
    required: true,
  })
  active_on:string

  @ApiProperty({
    required: true,
  })
  id_news:string

  @ApiProperty({
    required: false,
  })
  periode: string
}
