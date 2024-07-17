import { IsString, IsEmail, IsNotEmpty, MinLength, IsInt, Min, Max } from 'class-validator'

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  role: string;
 
  @IsInt()
  @Min(0)
  @Max(120)
  age: number;
}
 