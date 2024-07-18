import { ExcludeService } from '@helpers/exclude.service'
import { HelpersModule } from '@helpers/helpers.module'
import {
  forwardRef,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService, JwtModule } from '@nestjs/jwt'
import { TestingModule, Test } from '@nestjs/testing'
import { IUserResponse } from '@user/interface/userResponse.interface'
import { UserService } from '@user/service/user.service'
import { UsersModule } from '@user/user.module'
import * as bcrypt from 'bcrypt'
import { randomUUID } from 'crypto'
import { AuthController } from '../auth.controller'
import { AuthService } from '../auth.service'

describe('AuthService', () => {
  let authService: AuthService
  let userService: UserService
  let jwtService: JwtService
  let excludeService: ExcludeService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        forwardRef(() => UsersModule),
        HelpersModule,
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
    jwtService = module.get<JwtService>(JwtService)
    excludeService = module.get<ExcludeService>(ExcludeService)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(authService).toBeDefined()
  })

  describe('signIn', () => {
    it('should return access_token when valid email and password are provided', async () => {
      // Mock userService.findByEmail to return a valid user response
      const mockUser = {
        id: randomUUID(),
        fullName: 'auth mock user',
        email: 'authmock@gmail.com',
        age: 24,
        role: 'user',
        password: await bcrypt.hash('password', 10),
        createdAt: Date.now(),
      }

      jest
        .spyOn(userService, 'findByEmail')
        .mockResolvedValue({ data: mockUser as unknown as IUserResponse })
      jest.spyOn(userService, 'findOne').mockResolvedValue(mockUser)
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true as never)
      jest.spyOn(jwtService, 'signAsync').mockResolvedValue('mockAccessToken')
      jest.spyOn(excludeService, 'exclude').mockReturnValue({
        id: mockUser.id,
        fullName: mockUser.fullName,
        email: mockUser.email,
        age: mockUser.age,
        role: mockUser.role,
        createdAt: mockUser.createdAt,
      })

      // Call signIn with valid credentials
      const result = await authService.login({
        email: 'authmock@gmail.com',
        pass: 'password',
      })

      // Assert that access_token is returned
      expect(result.access_token).toBeDefined()
    })

    it('should throw NotFoundException when user with given email is not found', async () => {
      // Mock userService.findByEmail to return null (user not found)
      jest.spyOn(userService, 'findByEmail').mockResolvedValue(null)

      // Call signIn with invalid email
      await expect(
        authService.login({
          email: 'nonexistent@example.com',
          pass: 'password',
        }),
      ).rejects.toThrow(NotFoundException)
    })

    it('should throw UnauthorizedException when invalid password is provided', async () => {
      // Mock userService.findByEmail to return a valid user response
      const mockUser = {
        id: randomUUID(),
        fullName: 'auth mock user',
        email: 'authmock@gmail.com',
        age: 24,
        role: 'user',
        password: await bcrypt.hash('password', 10),
        createdAt: Date.now(),
      }

      jest
        .spyOn(userService, 'findByEmail')
        .mockResolvedValue({ data: mockUser as unknown as IUserResponse })
      jest.spyOn(userService, 'findOne').mockResolvedValue(mockUser)
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false as never)

      // Call signIn with invalid password
      await expect(
        authService.login({
          email: 'authmock@gmail.com',
          pass: 'wrongpassword',
        }),
      ).rejects.toThrow(UnauthorizedException)
    })
  })
})
