import { IsString, IsNotEmpty, MinLength, IsEmail } from 'class-validator'

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  /**
   * The password of the user. Must be at least 6 characters long.
   * @example 'password123'
   */
  pass: string

  @IsEmail()
  @IsNotEmpty()
  /**
   * The email address of the user
   * @example 'user@example.com'
   */
  email: string
}
