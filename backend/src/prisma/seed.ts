// prisma/seed.ts
import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  // Hash passwords for security
  const hashedPassword = await bcrypt.hash('Password2024', 10)

  // Seed Users
  await prisma.user.createMany({
    data: [
      {
        email: 'user1@meuguru.com',
        password: hashedPassword,
        fullName: 'Alice Johnson',
        phoneNumber: '+1234567890',
        age: 30,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'user2@meuguru.com',
        password: hashedPassword,
        fullName: 'Bob Smith',
        phoneNumber: '+1234567891',
        age: 25,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'user3@meuguru.com',
        password: hashedPassword,
        fullName: 'Charlotte Brown',
        phoneNumber: '+1234567892',
        age: 29,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'user4@meuguru.com',
        password: hashedPassword,
        fullName: 'Daniel Wilson',
        phoneNumber: '+1234567893',
        age: 32,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'user5@meuguru.com',
        password: hashedPassword,
        fullName: 'Emma Davis',
        phoneNumber: '+1234567894',
        age: 27,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'user6@meuguru.com',
        password: hashedPassword,
        fullName: 'Frank Miller',
        phoneNumber: '+1234567895',
        age: 34,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'user7@meuguru.com',
        password: hashedPassword,
        fullName: 'Grace Taylor',
        phoneNumber: '+1234567896',
        age: 31,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'user8@meuguru.com',
        password: hashedPassword,
        fullName: 'Henry Anderson',
        phoneNumber: '+1234567897',
        age: 29,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'user9@meuguru.com',
        password: hashedPassword,
        fullName: 'Ivy Martinez',
        phoneNumber: '+1234567898',
        age: 26,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'user10@meuguru.com',
        password: hashedPassword,
        fullName: 'Jack Lewis',
        phoneNumber: '+1234567899',
        age: 33,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  })

  // Seed Staff
  await prisma.staff.createMany({
    data: [
      {
        email: 'admin1@meuguru.com',
        password: hashedPassword,
        fullName: 'Sarah Wilson',
        age: 40,
        role: 'admin',
        createdAt: new Date(),
      },
      {
        email: 'admin2@meuguru.com',
        password: hashedPassword,
        fullName: 'David Brown',
        age: 45,
        role: 'admin',
        createdAt: new Date(),
      },
      {
        email: 'member1@meuguru.com',
        password: hashedPassword,
        fullName: 'Emily Davis',
        age: 28,
        role: 'member',
        createdAt: new Date(),
      },
      {
        email: 'member2@meuguru.com',
        password: hashedPassword,
        fullName: 'James Taylor',
        age: 32,
        role: 'member',
        createdAt: new Date(),
      },
      {
        email: 'member3@meuguru.com',
        password: hashedPassword,
        fullName: 'Olivia Martinez',
        age: 29,
        role: 'member',
        createdAt: new Date(),
      },
      {
        email: 'member4@meuguru.com',
        password: hashedPassword,
        fullName: 'Liam Anderson',
        age: 31,
        role: 'member',
        createdAt: new Date(),
      },
      {
        email: 'member5@meuguru.com',
        password: hashedPassword,
        fullName: 'Sophia Taylor',
        age: 27,
        role: 'member',
        createdAt: new Date(),
      },
      {
        email: 'member6@meuguru.com',
        password: hashedPassword,
        fullName: 'Mason Harris',
        age: 34,
        role: 'member',
        createdAt: new Date(),
      },
      {
        email: 'member7@meuguru.com',
        password: hashedPassword,
        fullName: 'Isabella Clark',
        age: 26,
        role: 'member',
        createdAt: new Date(),
      },
      {
        email: 'member8@meuguru.com',
        password: hashedPassword,
        fullName: 'Ethan Lewis',
        age: 33,
        role: 'member',
        createdAt: new Date(),
      },
    ],
  })
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
