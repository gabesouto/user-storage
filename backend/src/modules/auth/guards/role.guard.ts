import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { StaffRoles } from '@staff/enum/staff-role.enum'
import { StaffService } from '@staff/service/staff.service'

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private staffService: StaffService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest()
    console.log(request.user)

    if (request?.user) {
      const { id } = request.user
      const user = await this.staffService.findOne(id)

      return user.role === StaffRoles.ADMIN
    }

    return false
  }
}
