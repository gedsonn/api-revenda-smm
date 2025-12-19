import { UserRepo } from '@/modules/user/repository/user.repository';
import { PrismaService } from '../prisma.service';
import { User } from '@/modules/user/entities/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepoImpl implements UserRepo {
  constructor(private readonly prisma: PrismaService) {}

  async find(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { wallet: true },
    });

    if (!user) return null;

    return new User(user);
  }

  async create(u: User): Promise<User> {
    const user = await this.prisma.user.create({
      data: {
        id: u.id,
        username: u.username,
        apis: {
          create: {
            key: '',
          },
        },
        wallet: {
          create: {
            balance: 0,
            locked: 0,
          },
        },
      },
      include: { wallet: true },
    });

    return new User(user);
  }
}
