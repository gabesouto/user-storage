import { Module } from '@nestjs/common'
import { UsersModule } from './modules/user/user.module'
import { AuthModule } from './modules/auth/auth.module'
import { StaffModule } from '@staff/staff.module'
import { WinstonModule } from 'nest-winston'
import { winstonConfig } from './logger/winston.config'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { LoggerInterceptor } from './logger/logger.interceptor'
import logger from './logger/logger'

@Module({
  imports: [
    UsersModule,
    AuthModule,
    StaffModule,
    WinstonModule.forRoot(winstonConfig),
  ],
  providers: [
    {
      provide: 'winston',
      useValue: logger,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    },
  ],
})
export class AppModule {}
