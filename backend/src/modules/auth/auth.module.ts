import { HelpersModule } from '@helpers/helpers.module'
import { forwardRef, Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { AuthController } from './controller/auth.controller'
import { AuthService } from './service/auth.service'
import { StaffModule } from '@staff/staff.module'

@Module({
  imports: [
    forwardRef(() => StaffModule),
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
