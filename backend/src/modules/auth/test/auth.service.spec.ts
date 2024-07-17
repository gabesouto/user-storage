import { Test, TestingModule } from '@nestjs/testing'
import { AuthService } from '../auth.service'
import { JwtModule } from '@nestjs/jwt'
import { forwardRef } from '@nestjs/common'
import { UsersModule } from '../../user/user.module'
import { AuthController } from '../auth.controller'

describe('AuthService', () => {
  let service: AuthService

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

    service = module.get<AuthService>(AuthService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
