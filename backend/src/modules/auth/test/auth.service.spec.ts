import { Test, TestingModule } from '@nestjs/testing'
import { AuthService } from '../auth.service'
import { JwtModule } from '@nestjs/jwt'
import {
  forwardRef,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { UsersModule } from '../../user/user.module'
import { AuthController } from '../auth.controller'
import { UserService } from '../../user/service/user.service'
import * as bcrypt from 'bcrypt'
import { randomUUID } from 'crypto'
import { afterEach } from 'node:test'

describe('AuthService', () => {
  let authService: AuthService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        forwardRef(() => UsersModule),
        JwtModule.register({
          global: true,
          secret: process.env.JWT_SECRET || '',
          signOptions: { expiresIn: '86400s' },
        }),
      ],
      controllers: [AuthController],
      providers: [AuthService],
      exports: [AuthService],
    }).compile()

    authService = module.get<AuthService>(AuthService)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(authService).toBeDefined()
  })

  describe('AuthService', () => {
    let authService: AuthService
    let userService: UserService

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        imports: [
          forwardRef(() => UsersModule),
          JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET || '',
            signOptions: { expiresIn: '86400s' },
          }),
        ],
        controllers: [AuthController],
        providers: [AuthService],
        exports: [AuthService],
      }).compile()

      authService = module.get<AuthService>(AuthService)
      userService = module.get<UserService>(UserService)
    })

    it('should be defined', () => {
      expect(authService).toBeDefined()
    })

    describe('signIn', () => {
      it('should return access_token when valid email and password are provided', async () => {
        // Mock userService.findOne to return a valid user

        const mockUser = {
          id: randomUUID(),
          fullName: 'auth mock user',
          email: 'authmock@gmail.com',
          age: 24,
          role: 'user',
          password: await bcrypt.hash('password', 10),
          createdAt: Date.now(),
        }

        jest.spyOn(userService, 'findOne').mockResolvedValue(mockUser)

        // Call signIn with valid credentials
        const result = await authService.signIn({
          email: 'authmock@gmail.com',
          pass: 'password',
        })

        // Assert that access_token is returned
        expect(result.access_token).toBeDefined()
      })

      it('should throw NotFoundException when user with given email is not found', async () => {
        // Mock userService.findOne to return null (user not found)
        jest.spyOn(userService, 'findOne').mockResolvedValue(null)

        // Call signIn with invalid email
        await expect(
          authService.signIn({
            email: 'nonexistent@example.com',
            pass: 'password',
          }),
        ).rejects.toThrow(NotFoundException)
      })

      it('should throw UnauthorizedException when invalid password is provided', async () => {
        // Mock userService.findOne to return a valid user

        const mockUser = {
          id: randomUUID(),
          fullName: 'auth mock user',
          email: 'authmock@gmail.com',
          age: 24,
          role: 'user',
          password: await bcrypt.hash('password', 10),
          createdAt: Date.now(),
        }

        jest.spyOn(userService, 'findOne').mockResolvedValue(mockUser)

        // Call signIn with invalid password
        await expect(
          authService.signIn({
            email: 'test@example.com',
            pass: 'wrongpassword',
          }),
        ).rejects.toThrow(UnauthorizedException)
      })
    })
  })
})
