import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { BaseDto } from 'src/commons/base.dto'

export class FilterStoreDto extends BaseDto{
  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  search: string

  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  id_mitra: string
}
