import { ApiProperty } from '@nestjs/swagger'

export class UpdateStatusCommentDto {
  @ApiProperty({
    required: true,
  })
  status: string
}
