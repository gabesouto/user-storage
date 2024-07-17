import { Test, TestingModule } from '@nestjs/testing'
import { randomUUID } from 'crypto';
import { PrismaService } from "../database/prisma.service"
import { UserService } from '../modules/user/service/user.service'
    

describe('PostsService', () => {
  let service: UserService;
  let prisma: PrismaService;

  let mockUser = {
    id: randomUUID(),
    fullName: "mock user",
    email: "mock@gmail.com",
    age: 24,
    role: "admin",
    createdAt: Date.now()
  }

  let prismaMock = {
    user: {
      create: jest.fn().mockReturnValue(mockUser),
      // findMany: jest.fn().mockResolvedValue(fakePosts),
      // findUnique: jest.fn().mockResolvedValue(fakePosts[0]),
      // update: jest.fn().mockResolvedValue(fakePosts[0]),
      // delete: jest.fn(), // O método delete não retorna nada
    },
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });


  describe('create', () => {
    it(`should create a new user`, async () => {

      let newUser = {
        fullName: "mock user",
        email: "mock@gmail.com",
        password: "12345678",
        age: 24,
        role: "admin",
      }
      
      const response = await service.post(newUser);

      expect(response).toStrictEqual({data: mockUser})
      expect(prisma.user.create).toHaveBeenCalledTimes(1);

    });
  });
});