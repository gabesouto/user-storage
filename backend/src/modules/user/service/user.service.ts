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

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly excludeService: ExcludeService,
  ) {}

  async create({
    fullName,
    phoneNumber,
    age,
    password,
    email,
  }: CreateUserDto): Promise<{ data: ResponseUserDto }> {
    const hashPassword = await bcrypt.hash(password, 10)
    const newUser = await this.prisma.user.create({
      data: {
        fullName,
        password: hashPassword,
        phoneNumber,
        age,
        email,
        createdAt: new Date(),
        updatedAt: new Date(),
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
      const { age } = await this.prisma.user.findUnique({
        where: { id },
      })

      const updatedUser = await this.prisma.user.update({
        where: { id },
        data: { ...updateUser, age, id, updatedAt: new Date() },
      })

      const userWithoutPassword = this.excludeService.exclude(updatedUser, [
        'password',
      ])

      return { data: userWithoutPassword as ResponseUserDto }
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
    filter?: string, // Tornar o filtro opcional
  ): Promise<{ data: ResponseUserDto[]; total: number; pages: number }> {
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit

    if (filter) {
      // Aplicando o filtro
      const [field, value] = filter.split(':')
      const parsedValue = isNaN(Number(value)) ? value : Number(value)

      // Busca com filtro e ordenação
      const usersByFilter = await this.prisma.user.findMany({
        where: {
          [field]: parsedValue,
        },
        orderBy: { updatedAt: 'desc' }, // Adiciona a ordenação aqui
      })

      if (!usersByFilter || usersByFilter.length === 0) {
        throw new NotFoundException('No users found for the given filter')
      }

      const usersWithoutPasswords = usersByFilter.map((user) =>
        this.excludeService.exclude(user, ['password']),
      )

      const total = usersByFilter.length
      const totalPages = Math.ceil(total / limit)

      // Pagina os resultados filtrados
      const paginatedUsers = usersWithoutPasswords.slice(startIndex, endIndex)

      return {
        data: paginatedUsers,
        total,
        pages: totalPages,
      }
    }

    // Se não houver filtro, busca todos os usuários com ordenação e paginação
    const users = await this.prisma.user.findMany({
      skip: startIndex,
      take: limit,
      orderBy: { updatedAt: 'desc' },
    })

    if (users.length === 0) {
      throw new NotFoundException('No users found for the given page and limit')
    }

    // Obtém o total de usuários
    const total = await this.prisma.user.count()
    const usersWithoutPasswords = users.map((user) =>
      this.excludeService.exclude(user, ['password']),
    )

    const totalPages = Math.ceil(total / limit)

    return {
      data: usersWithoutPasswords,
      total,
      pages: totalPages,
    }
  }

  async findOne(id: string): Promise<IUser> {
    const user = await this.prisma.user.findUnique({ where: { id } })
    if (!user) {
      throw new NotFoundException('User not found')
    }

    return user
  }
}
