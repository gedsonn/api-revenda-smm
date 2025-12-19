import { Wallet } from '@/modules/wallet/entities/wallet.entity';
import { WalletRepo } from '@/modules/wallet/repository/wallet.repositort';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@/generated/prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WallerRepositoryImpl implements WalletRepo {
  constructor(private readonly prisma: PrismaService) {}

  async find(id: string): Promise<Wallet | null> {
    const wallet = await this.prisma.wallet.findUnique({
      where: { id },
      include: { history: true },
    });

    if (!wallet) return null;

    return new Wallet(wallet);
  }

  async create(data: Wallet): Promise<Wallet> {
    const wallet: Prisma.WalletGetPayload<{
      include: { history: true };
    }> = await this.prisma.wallet.create({
      data: {
        balance: data.balance,
        locked: data.locked,
        userId: data.userId,
      },
      include: { history: true },
    });

    return new Wallet(wallet);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.wallet.delete({
      where: { id },
    });

    return;
  }

  async findByUser(id: string): Promise<Wallet | null> {
    const wallet = await this.prisma.wallet.findUnique({
      where: { userId: id },
      include: { history: true },
    });

    if (!wallet) return null;

    return new Wallet(wallet);
  }
}
