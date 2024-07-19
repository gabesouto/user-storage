import { Injectable } from '@nestjs/common'
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
}
