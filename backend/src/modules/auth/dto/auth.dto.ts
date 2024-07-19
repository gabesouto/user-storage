import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty, MinLength, IsEmail } from 'class-validator'

export class LoginDto {
  @ApiProperty({
    description:
      'The password of the user. Must be at least 8 characters long.',
    example: 'password123',
    minLength: 8, // Optional: specifies the minimum length
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  pass: string

  @ApiProperty({
    description: 'The email address of the user',
    example: 'user@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string
}
