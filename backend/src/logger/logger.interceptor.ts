import {
  Injectable,
  Inject,
  NestInterceptor,
  CallHandler,
  ExecutionContext,
} from '@nestjs/common'
import { Logger } from 'winston'
import { Observable } from 'rxjs'
import { IUser } from '@user/interface/user.interface'

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor(@Inject('winston') private logger: Logger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    this.log(context.switchToHttp().getRequest())
    return next.handle()
  }

  private log(req) {
    const body = this.sanitize(req.body)
    const user = req as IUser
    const userEmail = user ? user.email : null
    this.logger.info({
      timestamp: new Date().toISOString(),
      method: req.method,
      route: req.route.path,
      data: {
        body,
        query: req.query,
        params: req.params,
      },
      from: req.ip,
      madeBy: userEmail,
    })
  }

  private sanitize(data: Record<string, unknown>): Record<string, unknown> {
    const sensitiveFields = ['pass', 'passwordConfirmation']
    const sanitizedData = { ...data }
    for (const field of sensitiveFields) {
      if (field in sanitizedData) {
        delete sanitizedData[field]
      }
    }
    return sanitizedData
  }
}
