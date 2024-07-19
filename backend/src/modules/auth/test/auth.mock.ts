import { randomUUID } from 'crypto'

// Mock for LoginDto
export const mockLoginDto = {
  email: 'user@example.com',
  pass: 'password123',
}

// Mock for CreateStaffDto
export const mockCreateStaffDto = {
  email: 'staff.member@example.com',
  password: 'strongPassword123',
  fullName: 'Jane Smith',
  age: 35,
  role: 'admin',
}

// Mock for ResponseStaffMemberDto
export const mockResponseStaffMemberDto = {
  id: randomUUID(),
  fullName: 'John Doe',
  email: 'john.doe@example.com',
  password: 'securePassword123', // Using bcrypt to hash the password
  role: 'admin',
  age: 30,
  createdAt: new Date(),
  phoneNumber: '+1234567890',
}

// Mock for a staff member
export const mockStaffMember = {
  id: randomUUID(),
  fullName: 'John Doe',
  email: 'john.doe@example.com',
  password: 'securePassword123', // Using bcrypt to hash the password
  role: 'admin',
  age: 30,
  createdAt: new Date(),
  updatedAt: new Date(),
  phoneNumber: '+1234567890',
}

// Mock for multiple staff members
export const mockStaffMembers = [
  {
    id: randomUUID(),
    fullName: 'Staff Member 1',
    email: 'staff1@example.com',
    password: 'securePassword123',
    role: 'admin',
    age: 28,
    createdAt: new Date(),
    updatedAt: new Date(),
    phoneNumber: '+1234567891',
  },
  {
    id: randomUUID(),
    fullName: 'Staff Member 2',
    email: 'staff2@example.com',
    password: 'securePassword123',
    role: 'user',
    age: 32,
    createdAt: new Date(),
    updatedAt: new Date(),
    phoneNumber: '+1234567892',
  },
  {
    id: randomUUID(),
    fullName: 'Staff Member 3',
    email: 'staff3@example.com',
    password: 'securePassword123',
    role: 'manager',
    age: 40,
    createdAt: new Date(),
    updatedAt: new Date(),
    phoneNumber: '+1234567893',
  },
]
