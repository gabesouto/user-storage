import { Injectable, NotFoundException } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import {
  CreateUserDto,
  ResponseUserDto,
  UpdateUserDto,
} from '@user/dto/user.dto'
import { PrismaService } from '@database/prisma.service'
import { ExcludeService } from '@helpers/exclude.service'
import { IUser } from '@user/interface/user.interface'
import { IUserResponse } from '@user/interface/user-response.interface'

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly excludeService: ExcludeService,
  ) {}

  async create({
    fullName,
    role,
    age,
    password,
    email,
  }: CreateUserDto): Promise<{ data: ResponseUserDto }> {
    const hashPassword = await bcrypt.hash(password, 10)
    const newUser = await this.prisma.user.create({
      data: {
        fullName,
        password: hashPassword,
        role,
        age,
        email,
        createdAt: new Date(),
      },
    })

    const userWithoutPassword = this.excludeService.exclude(newUser, [
      'password',
    ])

    return {
      data: userWithoutPassword as ResponseUserDto,
    }
  }

  async findByEmail(email: string): Promise<{ data: ResponseUserDto }> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      throw new NotFoundException('User not found')
    }

    return { data: user }
  }

  async update(
    id: string,
    updateUser: UpdateUserDto,
  ): Promise<{ data: ResponseUserDto }> {
    try {
      const userUpdated = await this.prisma.user.update({
        where: { id },
        data: updateUser,
      })

      const userWithoutPassword = this.excludeService.exclude(userUpdated, [
        'password',
      ])

      return { data: userWithoutPassword as IUserResponse }
    } catch (error) {
      throw new NotFoundException('User not found')
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.prisma.user.delete({ where: { id } })
    } catch (error) {
      throw new NotFoundException('User not found')
    }
  }

  async findAll(
    page: number,
    limit: number,
    filter: string,
  ): Promise<{ data: ResponseUserDto[] }> {
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    if (filter) {
      const [field, value] = filter.split(':')

      const parsedValue = isNaN(Number(value)) ? value : Number(value)

      const usersByFilter = await this.prisma.user.findMany({
        where: {
          [field]: parsedValue,
        },
      })

      if (!usersByFilter) {
        throw new NotFoundException('No users found for the given filter')
      }

      const usersWithoutPasswords = usersByFilter.map((user) =>
        this.excludeService.exclude(user, ['password']),
      )

      return { data: usersWithoutPasswords }
    }

    const users = await this.prisma.user.findMany({
      skip: startIndex,
      take: endIndex,
    })

    if (!users) {
      throw new NotFoundException('No users found for the given page and limit')
    }
    const usersWithoutPasswords = users.map((user) =>
      this.excludeService.exclude(user, ['password']),
    )

    return { data: usersWithoutPasswords }
  }

  async findOne(id: string): Promise<IUser> {
    const user = await this.prisma.user.findUnique({ where: { id } })
    if (!user) {
      throw new NotFoundException('User not found')
    }

    return user
  }
}
