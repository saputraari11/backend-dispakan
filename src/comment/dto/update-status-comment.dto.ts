import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class UpdateStatusCommentDto {
  @ApiProperty({
    required: true,
  })
  @IsString()
  status: string
}
