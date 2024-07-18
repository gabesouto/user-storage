import { forwardRef, Module } from '@nestjs/common'
import { UsersModule } from '../user/user.module'
import { AuthService } from './auth.service'
import { JwtModule } from '@nestjs/jwt'
import { AuthController } from './auth.controller'
import { HelpersModule } from '../helpers/helpers.module'

@Module({
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || '',
      signOptions: { expiresIn: '86400s' },
    }),
    HelpersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
