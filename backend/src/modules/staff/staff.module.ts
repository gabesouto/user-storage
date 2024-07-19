import { ExcludeService } from '@helpers/exclude.service'
import { forwardRef, Module } from '@nestjs/common'
import { StaffController } from './controller/staff.controller'
import { StaffService } from './service/staff.service'
import { PrismaModule } from '@database/prisma.module'
import { AuthModule } from '@auth/auth.module'

@Module({
  imports: [PrismaModule, forwardRef(() => AuthModule)],
  controllers: [StaffController],
  providers: [StaffService, ExcludeService],
  exports: [StaffService],
})
export class StaffModule {}
