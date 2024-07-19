import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsEmail, IsNotEmpty, MinLength } from 'class-validator'

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty({
    description:
      'The password of the user. Must be at least 8 characters long.',
    example: 'password123',
  })
  pass: string

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The email address of the user',
    example: 'user@example.com',
  })
  email: string
}
