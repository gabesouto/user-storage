import { ApiProperty } from '@nestjs/swagger'
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsInt,
  Min,
  Max,
  IsDate,
  IsOptional,
  Matches,
  IsUUID,
} from 'class-validator'

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The full name of the user',
    example: 'John Doe',
  })
  fullName: string

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty({
    description:
      'The password of the user. Must be at least 8 characters long.',
    example: 'securePassword123',
  })
  password: string

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The email address of the user',
    example: 'john.doe@example.com',
  })
  email: string

  @IsInt()
  @Min(0)
  @Max(120)
  @ApiProperty({
    description: 'The age of the user. Must be between 0 and 120.',
    example: 30,
  })
  age: number

  @IsOptional()
  @IsString()
  @Matches(/^\+?[1-9]\d{1,14}$/) // Simple phone number validation
  @ApiProperty({
    description: 'The phone number of the user (optional).',
    example: '+1234567890',
  })
  phoneNumber?: string
}

export class ResponseUserDto {
  @IsUUID('4')
  @ApiProperty({
    description: 'The unique identifier of the user',
    example: 'b1d5f6a0-4736-4b8f-8d3c-b4a4d5e77bde',
  })
  id: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The full name of the user',
    example: 'John Doe',
  })
  fullName: string

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The email address of the user',
    example: 'john.doe@example.com',
  })
  email: string

  @IsInt()
  @Min(0)
  @Max(120)
  @ApiProperty({
    description: 'The age of the user. Must be between 0 and 120.',
    example: 30,
  })
  age: number

  @IsDate()
  @ApiProperty({
    description: 'The date when the user was created.',
    example: '2024-07-19T15:30:00.000Z',
  })
  createdAt: Date

  @IsDate()
  @ApiProperty({
    description: 'The date when the user was updated.',
    example: '2024-07-19T15:30:00.000Z',
  })
  updatedAt: Date

  @IsOptional()
  @IsString()
  @Matches(/^\+?[1-9]\d{1,14}$/) // Simple phone number validation
  @ApiProperty({
    description: 'The phone number of the user (optional).',
    example: '+1234567890',
  })
  phoneNumber?: string
}

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The full name of the user',
    example: 'John Doe',
  })
  fullName: string

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The email address of the user',
    example: 'john.doe@example.com',
  })
  email: string

  @IsOptional()
  @IsString()
  @Matches(/^\+?[1-9]\d{1,14}$/) // Simple phone number validation
  @ApiProperty({
    description: 'The phone number of the user (optional).',
    example: '+1234567890',
  })
  phoneNumber?: string
}
