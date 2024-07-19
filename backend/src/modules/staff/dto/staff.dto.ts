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
  IsOptional,
  IsUUID,
  Matches,
} from 'class-validator'

export class CreateStaffDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The email address of the staff member. Must be unique.',
    example: 'jane.smith@example.com',
  })
  email: string

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty({
    description:
      'The password for the staff member. Must be at least 8 characters long.',
    example: 'Password2024',
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
    example: 28,
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
  @IsUUID('4')
  @ApiProperty({
    description: 'The unique identifier of the staff member',
    example: 'b1d5f6a0-4736-4b8f-8d3c-b4a4d5e77bde',
  })
  id: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The full name of the staff member',
    example: 'Jane Smith',
  })
  fullName: string

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty({
    description:
      'The password of the staff member. Must be at least 8 characters long.',
    example: 'Password2024',
  })
  password: string

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
    example: 'jane.smith@example.com',
  })
  email: string

  @IsInt()
  @Min(0)
  @Max(120)
  @ApiProperty({
    description: 'The age of the staff member. Must be between 0 and 120.',
    example: 28,
  })
  age: number

  @IsDate()
  @ApiProperty({
    description: 'The date when the staff member was created.',
    example: '2024-07-19T15:30:00.000Z',
  })
  createdAt: Date

  @IsOptional()
  @IsString()
  @Matches(/^\+?[1-9]\d{1,14}$/) // Simple phone number validation
  @ApiProperty({
    description: 'The phone number of the staff member (optional).',
    example: '+1234567890',
  })
  phoneNumber?: string
}
