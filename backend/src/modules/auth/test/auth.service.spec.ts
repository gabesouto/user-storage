import { HelpersModule } from '../../helpers/helpers.module'
import {
  forwardRef,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService, JwtModule } from '@nestjs/jwt'
import { TestingModule, Test } from '@nestjs/testing'
import { StaffService } from '@staff/service/staff.service'
import { StaffModule } from '@staff/staff.module'
import * as bcrypt from 'bcrypt'
import { randomUUID } from 'crypto'
import { AuthController } from '../controller/auth.controller'
import { AuthService } from '../service/auth.service'
import { ExcludeService } from '@helpers/exclude.service'
import { ResponseStaffMemberDto } from '@staff/dto/staff.dto'

describe('AuthService', () => {
  let authService: AuthService
  let jwtService: JwtService
  let excludeService: ExcludeService
  let staffService: StaffService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        forwardRef(() => StaffModule),
        HelpersModule,
        JwtModule.register({
          global: true,
          secret: process.env.JWT_SECRET || '',
          signOptions: { expiresIn: '86400s' },
        }),
      ],
      controllers: [AuthController],
      providers: [AuthService, ExcludeService],
    }).compile()

    authService = module.get<AuthService>(AuthService)
    jwtService = module.get<JwtService>(JwtService)
    excludeService = module.get<ExcludeService>(ExcludeService)
    staffService = module.get<StaffService>(StaffService)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(authService).toBeDefined()
  })

  describe('login', () => {
    it('should return access_token when valid email and password are provided', async () => {
      // Mock staffService.findByEmail to return a valid staff member response
      const mockStaffMember = {
        id: randomUUID(),
        fullName: 'auth mock user',
        email: 'authmock@gmail.com',
        age: 24,
        role: 'user',
        password: await bcrypt.hash('password', 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      jest
        .spyOn(staffService, 'findByEmail')
        .mockResolvedValue(mockStaffMember as unknown as ResponseStaffMemberDto)
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true as never)
      jest.spyOn(jwtService, 'signAsync').mockResolvedValue('mockAccessToken')
      jest.spyOn(excludeService, 'exclude').mockReturnValue({
        id: mockStaffMember.id,
        fullName: mockStaffMember.fullName,
        email: mockStaffMember.email,
        age: mockStaffMember.age,
        role: mockStaffMember.role,
        createdAt: mockStaffMember.createdAt,
      })

      // Call login with valid credentials
      const result = await authService.login({
        email: 'authmock@gmail.com',
        pass: 'password',
      })

      // Assert that access_token is returned
      expect(result.access_token).toBeDefined()
    })

    it('should throw NotFoundException when staff member with given email is not found', async () => {
      // Mock staffService.findByEmail to return null (staff member not found)
      jest.spyOn(staffService, 'findByEmail').mockResolvedValue(null)

      // Call login with invalid email
      await expect(
        authService.login({
          email: 'nonexistent@example.com',
          pass: 'password',
        }),
      ).rejects.toThrow(NotFoundException)
    })

    it('should throw UnauthorizedException when invalid password is provided', async () => {
      // Mock staffService.findByEmail to return a valid staff member response
      const mockStaffMember = {
        id: randomUUID(),
        fullName: 'auth mock user',
        email: 'authmock@gmail.com',
        age: 24,
        role: 'user',
        password: await bcrypt.hash('password', 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      jest
        .spyOn(staffService, 'findByEmail')
        .mockResolvedValue(mockStaffMember as unknown as ResponseStaffMemberDto)
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false as never)

      // Call login with invalid password
      await expect(
        authService.login({
          email: 'authmock@gmail.com',
          pass: 'wrongpassword',
        }),
      ).rejects.toThrow(UnauthorizedException)
    })
  })
})
