import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { BaseDto } from '../../commons/base.dto'

export class UpdateProfileDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id_owner_umkm: string

  @ApiProperty()
  @IsOptional()
  @IsString()
  name?: string

  @ApiProperty()
  @IsOptional()
  @IsString()
  address?: string

  @ApiProperty()
  @IsOptional()
  @IsString()
  phone?: string

  @ApiProperty()
  @IsOptional()
  @IsEmail()
  email?: string

  @ApiProperty()
  @IsOptional()
  @IsString()
  new_password?: string

  @ApiProperty()
  @IsOptional()
  @IsString()
  old_password?: string
}
