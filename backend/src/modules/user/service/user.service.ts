import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../dto/user.dto';
import { PrismaService } from '../../../database/prisma.service'
import { ExcludeService } from '../helpers/exclude.service';

@Injectable()
export class UserService {
  constructor
  (
    private readonly prisma: PrismaService,
    private readonly excludeService: ExcludeService
  ) {}

  async create({ fullName, role, age, password, email }: CreateUserDto) {
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

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if(!user){    
      throw new NotFoundException('user not found')
    }

    const userWithoutPassword =  this.excludeService.exclude(user, ['password']);

    return {data: userWithoutPassword}
  }
}
