import { ApiProperty } from '@nestjs/swagger'
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  Matches,
  MinLength,
  MaxLength,
  IsOptional,
} from 'class-validator'
import { BaseDto } from 'src/commons/base.dto'
import { UserLevel } from 'src/users/user-level.enum'

export class SignupCredentialsDto extends BaseDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  name?: string

  @ApiProperty()
  @IsString()
  @IsOptional()
  address?: string

  @ApiProperty()
  @IsString()
  @IsOptional()
  phone?: string

  @ApiProperty()
  @IsString()
  @IsOptional()
  email: string

  @ApiProperty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, {
    message: 'password to weak',
  })
  password: string

  level: UserLevel
  createdBy: any
}
