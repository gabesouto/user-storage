import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto'
import { PrismaService } from '../../../database/prisma.service'
import { ExcludeService } from '../helpers/exclude.service'
import { IUserResponse } from '../interface/userResponse.interface'

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
  }: CreateUserDto): Promise<IUserResponse> {
    const newUser = await this.prisma.user.create({
      data: {
        fullName,
        password,
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
      data: userWithoutPassword,
    }
  }

  async findById(id: string): Promise<IUserResponse> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    })

    if (!user) {
      throw new NotFoundException('user not found')
    }

    const userWithoutPassword = this.excludeService.exclude(user, ['password'])

    return { data: userWithoutPassword }
  }

  async update(id: string, updateUser: UpdateUserDto): Promise<IUserResponse> {
    try {
      const userUpdated = await this.prisma.user.update({
        where: { id },
        data: updateUser,
      })

      const userWithoutPassword = this.excludeService.exclude(userUpdated, [
        'password',
      ])

      return { data: userWithoutPassword }
    } catch (error) {
      throw new NotFoundException('user not found')
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.prisma.user.delete({ where: { id } })
    } catch (error) {
      throw new NotFoundException('user not found')
    }
  }

  async findAll(page: number, limit: number): Promise<IUserResponse> {
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit

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
}
