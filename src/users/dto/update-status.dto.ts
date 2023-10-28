import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsString } from 'class-validator'

export class UpdateStatusDto {
  @ApiProperty()
  status: string | boolean
}
