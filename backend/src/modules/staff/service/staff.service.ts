import { Injectable, NotFoundException } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { PrismaService } from '@database/prisma.service'
import { CreateStaffDto, ResponseStaffMemberDto } from '@staff/dto/staff.dto'

@Injectable()
export class StaffService {
  constructor(private readonly prisma: PrismaService) {}

  async create({
    fullName,
    role,
    age,
    password,
    email,
  }: CreateStaffDto): Promise<{ data: ResponseStaffMemberDto }> {
    const hashPassword = await bcrypt.hash(password, 10)
    const newStaffMember = await this.prisma.staff.create({
      data: {
        fullName,
        password: hashPassword,
        role,
        age,
        email,
        createdAt: new Date(),
      },
    })

    return {
      data: newStaffMember,
    }
  }

  async findByEmail(email: string): Promise<ResponseStaffMemberDto> {
    const staffMember = await this.prisma.staff.findUnique({
      where: { email },
    })

    if (!staffMember) {
      throw new NotFoundException('Staff Member not found')
    }

    return staffMember
  }

  async findOne(id: string): Promise<ResponseStaffMemberDto> {
    const user = await this.prisma.staff.findUnique({ where: { id } })
    if (!user) {
      throw new NotFoundException('User not found')
    }

    return user
  }
}
