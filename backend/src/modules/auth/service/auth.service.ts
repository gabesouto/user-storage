import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { ExcludeService } from '@helpers/exclude.service'
import { JwtService } from '@nestjs/jwt'
import { StaffService } from '@staff/service/staff.service'
import { ResponseStaffMemberDto } from '@staff/dto/staff.dto'

@Injectable()
export class AuthService {
  constructor(
    @Inject()
    private staffService: StaffService,
    @Inject()
    private readonly jwtService: JwtService,
    @Inject()
    private excludeService: ExcludeService,
  ) {}

  async login({
    email,
    pass,
  }: {
    email: string
    pass: string
  }): Promise<{ access_token: string }> {
    const staffMember = await this.validateUser(email, pass)
    const payload = {
      sub: staffMember.id,
      role: staffMember.role,
      email: staffMember.email,
    }

    return { access_token: await this.jwtService.signAsync(payload) }
  }

  async validateUser(
    email: string,
    pass: string,
  ): Promise<ResponseStaffMemberDto> {
    const staffMemberResponse = await this.staffService.findByEmail(email)
    if (!staffMemberResponse) {
      throw new NotFoundException('Staff member not found')
    }

    const passwordMatch = await bcrypt.compare(
      pass,
      staffMemberResponse.password,
    )

    if (passwordMatch) {
      return staffMemberResponse
    }
    if (!passwordMatch) throw new UnauthorizedException('Invalid credentials')

    return null
  }
}
