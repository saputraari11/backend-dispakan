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
  email?: string

  @ApiProperty()
  new_password?: string

  @ApiProperty()
  old_password?: string
}
