import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, IsEnum, IsBoolean } from 'class-validator'

export class UpdateProfileDto {
  @ApiProperty()
  id_owner_umkm: string

  @ApiProperty()
  name?: string

  @ApiProperty()
  address?: string

  @ApiProperty()
  phone?: string

  @ApiProperty()
  status?: boolean
}
