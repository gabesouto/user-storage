import { Test, TestingModule } from '@nestjs/testing'
import { randomUUID } from 'crypto'
import { PrismaService } from '../database/prisma.service'
import { UserService } from '../modules/user/service/user.service'
import { ExcludeService } from '../modules/user/helpers/exclude.service'
import { NotFoundException } from '@nestjs/common'

describe('PostsService', () => {
  let service: UserService
  let prisma: PrismaService

  const mockUser = {
    id: randomUUID(),
    fullName: 'mock user',
    email: 'mock@gmail.com',
    age: 24,
    role: 'admin',
    createdAt: Date.now(),
  }

  const mockUpdatedUser = {
    fullName: 'updated mock user',
    email: 'mock@gmail.com',
    age: 20,
    role: 'user',
    id: mockUser.id,
    createdAt: mockUser.createdAt,
  }

  const prismaMock = {
    user: {
      create: jest.fn().mockReturnValue(mockUser),
      // findMany: jest.fn().mockResolvedValue(fakePosts),
      findUnique: jest.fn().mockResolvedValue(mockUser),
      update: jest.fn().mockResolvedValue(mockUpdatedUser),
      // delete: jest.fn(), // O método delete não retorna nada
    },
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        ExcludeService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile()

    service = module.get<UserService>(UserService)
    prisma = module.get<PrismaService>(PrismaService)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('create', () => {
    it(`should create a new user`, async () => {
      const newUser = {
        fullName: 'mock user',
        email: 'mock@gmail.com',
        password: '12345678',
        age: 24,
        role: 'admin',
      }

      const response = await service.create(newUser)
      expect(response).toStrictEqual({ data: mockUser })
      expect(prisma.user.create).toHaveBeenCalledTimes(1)
    })
  })

  describe('create', () => {
    it(`should create a new user`, async () => {
      const newUser = {
        fullName: 'mock user',
        email: 'mock@gmail.com',
        password: '12345678',
        age: 24,
        role: 'admin',
      }

      const response = await service.create(newUser)
      expect(response).toStrictEqual({ data: mockUser })
      expect(prisma.user.create).toHaveBeenCalledTimes(1)
    })
  })

  describe('findOne', () => {
    it(`should return a single user`, async () => {
      const response = await service.findById(mockUser.id)

      expect(response).toEqual({ data: mockUser })
      expect(prisma.user.findUnique).toHaveBeenCalledTimes(1)
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { id: mockUser.id },
      })
    })

    it('should throw a NotFoundException when user is not found', async () => {
      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(null)

      await expect(service.findById('99')).rejects.toThrow(
        new NotFoundException('user not found'),
      )
    })
  })

  describe('updateOne', () => {
    it(`should update a post`, async () => {
      const mockToUpdateUser = {
        fullName: 'updated mock user',
        email: 'mock@gmail.com',
        age: 20,
        role: 'user',
      }
      const response = await service.update(mockUser.id, mockUpdatedUser)

      expect(response).toStrictEqual({
        data: {
          ...mockToUpdateUser,
          id: mockUser.id,
          createdAt: mockUser.createdAt,
        },
      })
    })

    it(`should return NotFoundException when no post is found`, async () => {
      jest.spyOn(prisma.user, 'update').mockResolvedValue(null)

      await expect(service.update(randomUUID(), mockUser)).rejects.toThrow(
        new NotFoundException('user not found'),
      )
    })
  })
})
