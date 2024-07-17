import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginDto } from './dto/login.dto'

@Controller('auth')
@UsePipes(ValidationPipe)
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('signin')
  async login(@Body() loginPayload: LoginDto) {
    return await this.auth.signIn(loginPayload)
  }
}
