import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { UserService } from '../user/service/user.service'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { ExcludeService } from '../helpers/exclude.service'
import { IUser } from '../user/interface/user.interface'

@Injectable()
export class AuthService {
  constructor(
    @Inject()
    private userService: UserService,
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
    const userWithPassword = await this.validateUser(email, pass)
    const payload = { sub: userWithPassword.id }

    return { access_token: await this.jwtService.signAsync(payload) }
  }

  async validateUser(email: string, pass: string): Promise<Partial<IUser>> {
    const userResponse = await this.userService.findByEmail(email)
    if (!userResponse) {
      throw new NotFoundException('User not found')
    }

    const user = Array.isArray(userResponse.data)
      ? userResponse.data[0]
      : userResponse.data

    const userWithPassword = await this.userService.findOne(user.id)
    const passwordMatch = await bcrypt.compare(pass, userWithPassword.password)

    if (passwordMatch) {
      const userWithoutPassword = this.excludeService.exclude(
        userWithPassword,
        ['password'],
      )
      return userWithoutPassword
    }
    if (!passwordMatch) throw new UnauthorizedException('Invalid credentials')

    return null
  }
}
