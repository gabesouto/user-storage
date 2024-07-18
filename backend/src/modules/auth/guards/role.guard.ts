import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { UserRoles } from '@user/enums/user.enum'
import { UserService } from '@user/service/user.service'

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private userService: UserService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest()
    console.log(request.user)

    if (request?.user) {
      const { id } = request.user
      const user = await this.userService.findOne(id)
      console.log(user, 'role')

      return user.role === UserRoles.ADMIN
    }

    return false
  }
}
