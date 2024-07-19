import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { StaffService } from '@staff/service/staff.service'
import { Request } from 'express'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private staffService: StaffService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const token = this.extractTokenFromHeader(request)
    if (!token) {
      throw new UnauthorizedException()
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      })
      const user = await this.staffService.findOne(payload.sub)
      request.user = user
      console.log('user', request.user)
    } catch {
      throw new UnauthorizedException()
    }
    return true
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? []
    return type === 'Bearer' ? token : undefined
  }
}
