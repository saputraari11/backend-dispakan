import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator'
import { REGEX } from '../../app.utils'

export class SignInDto {
  @ApiProperty({
    description: 'Email address of the user',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string

  @ApiProperty({
    description: 'Password in plain text',
  })
  @IsNotEmpty()
  @Matches(REGEX.PASSWORD_RULE)
  password: string

  @ApiProperty({
    description: 'Active of the user',
  })
  @IsString()
  @IsNotEmpty()
  active_on: string
}
