import { ApiProperty } from '@nestjs/swagger'
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  Matches,
  MinLength,
  MaxLength,
} from 'class-validator'
import { UserLevel } from 'src/users/user-level.enum'

export class SignupCredentialsDto {
  @ApiProperty()
  name?: string

  @ApiProperty()
  address?: string

  @ApiProperty()
  phone?: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
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
}
