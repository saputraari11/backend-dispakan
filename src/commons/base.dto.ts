import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class BaseDto {
  @ApiProperty({
    required: true,
  })
  active_on: string
}
