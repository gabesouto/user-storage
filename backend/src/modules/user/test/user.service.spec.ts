import { Test, TestingModule } from '@nestjs/testing'
import { randomUUID } from 'crypto'
import { PrismaService } from '../../database/prisma.service'
import { UserService } from '../service/user.service'
import { ExcludeService } from '../../helpers/exclude.service'
import { NotFoundException } from '@nestjs/common'

describe('UserService', () => {
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

  const mockUsers = [
    {
      id: randomUUID(),
      fullName: '1mock user',
      email: 'moc1@gmail.com',
      age: 24,
      role: 'admin',
      createdAt: Date.now(),
    },
    {
      id: randomUUID(),
      fullName: '2mock user',
      email: 'moc2@gmail.com',
      age: 24,
      role: 'admin',
      createdAt: Date.now(),
    },
    {
      id: randomUUID(),
      fullName: '3mock user',
      email: 'mock3@gmail.com',
      age: 24,
      role: 'admin',
      createdAt: Date.now(),
    },
  ]

  const prismaMock = {
    user: {
      create: jest.fn().mockReturnValue(mockUser),
      findMany: jest.fn().mockResolvedValue(mockUsers),
      findUnique: jest.fn().mockResolvedValue(mockUser),
      update: jest.fn().mockResolvedValue(mockUpdatedUser),
      delete: jest.fn(), // O método delete não retorna nada
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
      const response = await service.findOne(mockUser.id)

      expect(response).toEqual(mockUser)
      expect(prisma.user.findUnique).toHaveBeenCalledTimes(1)
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { id: mockUser.id },
      })
    })

    it('should throw a NotFoundException when user is not found', async () => {
      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(null)

      await expect(service.findOne('99')).rejects.toThrow(
        new NotFoundException('User not found'),
      )
    })
  })

  describe('updateOne', () => {
    it(`should update a user`, async () => {
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

    it(`should return NotFoundException when no user is found`, async () => {
      jest.spyOn(prisma.user, 'update').mockResolvedValue(null)

      await expect(service.update(randomUUID(), mockUser)).rejects.toThrow(
        new NotFoundException('User not found'),
      )
    })
  })

  describe('deleteOne', () => {
    it(`should delete a user`, async () => {
      expect(await service.delete(mockUser.id)).toBeUndefined()
    })

    it(`should return NotFoundException when no user is found`, async () => {
      jest.spyOn(prisma.user, 'delete').mockResolvedValue(null)

      await expect(service.update(randomUUID(), mockUser)).rejects.toThrow(
        new NotFoundException('User not found'),
      )
    })
  })

  describe('findAll', () => {
    it(`should return an array of users`, async () => {
      const response = await service.findAll(1, 5)

      expect(response).toEqual({ data: mockUsers })
    })

    it(`should throw an error if there is no users for page selected`, async () => {
      jest.spyOn(prisma.user, 'findMany').mockResolvedValue(null)
      await expect(service.findAll(100, 100)).rejects.toThrow(
        new NotFoundException('No users found for the given page and limit'),
      )
    })
  })
})

// TODO: AJUTAR PADRAO DE RESPOSTAS DAS EXCEPTIONS, ORGANIZAR COMMITS
