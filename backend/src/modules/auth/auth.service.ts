import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { UserService } from '../user/service/user.service'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    @Inject()
    private userService: UserService,
    @Inject()
    private readonly jwtService: JwtService,
  ) {}

  async signIn({
    email,
    pass,
  }: {
    email: string
    pass: string
  }): Promise<{ access_token: string }> {
    const user = await this.userService.findOne(email)
    if (!user) {
      throw new NotFoundException('User not found')
    }
    const passwordMatch = await bcrypt.compare(pass, user.password)
    if (!passwordMatch) throw new UnauthorizedException('Invalid credentials')
    // TODO: Generate a JWT and return it here
    // instead of the user object
    const payload = { sub: user.id }

    return { access_token: await this.jwtService.signAsync(payload) }
  }
}
