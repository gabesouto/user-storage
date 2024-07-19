import { ApiProperty } from '@nestjs/swagger'
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsInt,
  Min,
  Max,
  IsDate,
} from 'class-validator'

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
    example: 'admin',
  })
  role: string
}

export class ResponseStaffMemberDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The full name of the staff member',
    example: 'John Doe',
  })
  fullName: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The role of the staff member',
    example: 'admin',
  })
  role: string

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The email address of the staff member',
    example: 'john.doe@example.com',
  })
  email: string

  @IsInt()
  @Min(0)
  @Max(120)
  @ApiProperty({
    description: 'The age of the staff member. Must be between 0 and 120.',
    example: 30,
  })
  age: number

  @IsDate()
  @ApiProperty({
    description: 'The date when the staff member was created.',
    example: '2024-07-19T15:30:00.000Z',
  })
  createdAt: Date
}
