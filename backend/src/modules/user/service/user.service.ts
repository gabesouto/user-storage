import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/user.dto';
import { PrismaService } from '../../../database/prisma.service'

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async post({ fullName, role, age, password, email }: CreateUserDto) {
    const newUser = await this.prisma.user.create({
      data: {
        fullName,
        password,
        role,
        age,
        email,
        createdAt: new Date(),
      },
    });

    return {
      data: {
        id: newUser.id,
        fullName: newUser.fullName,
        email: newUser.email,
        role: newUser.role,
        age: newUser.age,
        createdAt: newUser.createdAt,
      },
    };
  }
}
