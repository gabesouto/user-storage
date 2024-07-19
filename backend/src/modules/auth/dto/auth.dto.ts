import { ApiProperty } from '@nestjs/swagger'
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsDate,
  IsInt,
  Max,
  Min,
} from 'class-validator'

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

export class CreateStaffDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The email address of the staff member. Must be unique.',
    example: 'staff.member@example.com',
  })
  email: string

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty({
    description:
      'The password for the staff member. Must be at least 8 characters long.',
    example: 'strongPassword123',
  })
  password: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The full name of the staff member.',
    example: 'Jane Smith',
  })
  fullName: string

  @IsInt()
  @Min(0)
  @Max(120)
  @ApiProperty({
    description: 'The age of the staff member. Must be between 0 and 120.',
    example: 35,
  })
  age: number

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The role of the staff member.',
    example: 'manager',
  })
  role: string

  @IsDate()
  @ApiProperty({
    description: 'The date when the staff member was created.',
    example: '2024-07-19T15:30:00.000Z',
  })
  createdAt: Date
}
