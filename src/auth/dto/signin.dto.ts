import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator'
import { REGEX } from '../../app.utils'
import { BaseDto } from '../../commons/base.dto'

export class SignInDto extends BaseDto {
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
}
