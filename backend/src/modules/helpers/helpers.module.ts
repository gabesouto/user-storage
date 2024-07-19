import { Module } from '@nestjs/common'
import { ExcludeService } from './exclude.service'

@Module({
  providers: [ExcludeService],
  exports: [ExcludeService],
})
export class HelpersModule {}
