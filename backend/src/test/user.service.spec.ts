import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../modules/user/controller/user.controller';
import { UserService } from '../modules/user/service/user.service';
import { PrismaService } from '../database/prisma.service';
import { TestBed } from '@automock/jest';
import { randomUUID } from 'crypto';
import { getPrismaClient } from '@prisma/client/runtime/library';
import { PrismaClient } from '@prisma/client';

describe('UserService', () => {
  let userService: UserService;
  let mockPrismaService = {}

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  // Add your tests here
  it('should be defined', () => {
    expect(userService).toBeDefined()
  })
});

  // TODO: acesso ao id na hora do mock esta quebrando o test