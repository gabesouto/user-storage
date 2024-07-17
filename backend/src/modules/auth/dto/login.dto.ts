import { IsString, IsEmail, IsNotEmpty, MinLength } from 'class-validator'

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  pass: string

  @IsEmail()
  @IsNotEmpty()
  email: string
}
