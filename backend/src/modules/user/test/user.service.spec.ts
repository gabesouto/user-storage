import { NotFoundException } from '@nestjs/common'
import { TestingModule, Test } from '@nestjs/testing'
import { randomUUID } from 'crypto'
import { ExcludeService } from '@helpers/exclude.service'
import { UserService } from '@user/service/user.service'
import { PrismaService } from '@database/prisma.service'
import { mockUser, mockUsers, mockUpdatedUser } from './user-service.mock'

describe('UserService', () => {
  let service: UserService
  let prisma: PrismaService

  const prismaMock = {
    user: {
      create: jest.fn().mockResolvedValue(mockUser),
      findMany: jest.fn().mockResolvedValue(mockUsers),
      findUnique: jest.fn().mockResolvedValue(mockUser),
      update: jest.fn().mockResolvedValue(mockUpdatedUser),
      delete: jest.fn().mockResolvedValue(undefined),
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
    it('should create a new user', async () => {
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
    it('should return a single user', async () => {
      const response = await service.findOne(mockUser.id)

      expect(response).toEqual(mockUser)
      expect(prisma.user.findUnique).toHaveBeenCalledTimes(1)
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { id: mockUser.id },
      })
    })

    it('should throw NotFoundException when user is not found', async () => {
      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(null)

      await expect(service.findOne('99')).rejects.toThrow(
        new NotFoundException('User not found'),
      )
    })
  })

  describe('update', () => {
    it('should update a user', async () => {
      const mockToUpdateUser = {
        id: mockUser.id,
        updatedAt: new Date(),
        fullName: 'updated mock user',
        email: 'updated@gmail.com',
        age: 20,
        phoneNumber: '+8493839',
      }
      const response = await service.update(mockUser.id, mockToUpdateUser)

      console.log('test response', response)

      expect(response).toEqual({
        data: {
          ...mockUpdatedUser,
          id: mockUser.id,
          createdAt: mockUser.createdAt,
          updatedAt: mockUpdatedUser.updatedAt,
          phoneNumber: mockUpdatedUser.phoneNumber,
        },
      })
    })

    it('should throw NotFoundException when update fails', async () => {
      jest.spyOn(prisma.user, 'update').mockResolvedValue(null)

      await expect(
        service.update(randomUUID(), mockUpdatedUser),
      ).rejects.toThrow(new NotFoundException('User not found'))
    })
  })

  describe('delete', () => {
    it('should delete a user', async () => {
      expect(await service.delete(mockUser.id)).toBeUndefined()
      expect(prisma.user.delete).toHaveBeenCalledTimes(1)
    })

    it('should throw NotFoundException when delete fails', async () => {
      jest.spyOn(prisma.user, 'delete').mockRejectedValue(new Error())

      await expect(service.delete(randomUUID())).rejects.toThrow(
        new NotFoundException('User not found'),
      )
    })
  })

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const response = await service.findAll(1, 5, '')

      expect(response).toEqual({ data: mockUsers })
      expect(prisma.user.findMany).toHaveBeenCalledTimes(1)
    })

    it('should return filtered users based on field and value', async () => {
      const filter = 'age:24'
      const response = await service.findAll(1, 5, filter)

      expect(response).toEqual({ data: mockUsers })
      expect(prisma.user.findMany).toHaveBeenCalledWith({
        where: { age: 24 },
      })
    })

    it('should throw NotFoundException if no users found for page selected', async () => {
      jest.spyOn(prisma.user, 'findMany').mockResolvedValue([])

      await expect(service.findAll(100, 100, '')).rejects.toThrow(
        new NotFoundException('No users found for the given page and limit'),
      )
    })
  })
})
