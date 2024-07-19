import { ExcludeService } from '@helpers/exclude.service'
import { Module } from '@nestjs/common'
import { StaffController } from './controller/staff.controller'
import { StaffService } from './service/staff.service'
import { PrismaModule } from '@database/prisma.module'

@Module({
  imports: [PrismaModule],
  controllers: [StaffController],
  providers: [StaffService, ExcludeService],
  exports: [StaffService],
})
export class StaffModule {}
