import { OrdemRepo } from '@/modules/ordem/repository/ordem.repository';
import { PrismaService } from '../prisma.service';
import { Ordem } from '@/modules/ordem/entities/ordem.entity';
import { Injectable } from '@nestjs/common';
import { OrdemStatus } from '@/generated/prisma/enums';
import { JsonObject } from '@prisma/client/runtime/client';

@Injectable()
export class OrdemRepositoryImpl implements OrdemRepo {
  constructor(private readonly prisma: PrismaService) {}

  async find(id: string): Promise<Ordem | null> {
    const order = await this.prisma.ordem.findUnique({
      where: { id },
    });
    if (!order) return null;
    return new Ordem(order);
  }

  async findByTxid(txid: string): Promise<Ordem | null> {
    const order = await this.prisma.ordem.findUnique({
      where: { txid },
    });
    if (!order) return null;
    return new Ordem(order);
  }

  async create(ordem: Ordem): Promise<Ordem> {
    const newOrdem = await this.prisma.ordem.create({
      data: {
        status: ordem.status,
        compradorId: ordem.compradorId,
        serviceId: Number(ordem.serviceId),
        txid: ordem.txid,
        pix: ordem.pix as JsonObject,
        keyId: ordem.keyId,
        extra: {},
        createdAt: ordem.createdAt,
        updatedAt: ordem.updatedAt,
      },
    });
    return new Ordem(newOrdem);
  }

  async findByUser(id: string, status: OrdemStatus): Promise<Ordem[]> {
    const orders = await this.prisma.ordem.findMany({
      where: {
        compradorId: id,
        status,
      },
    });
    return orders.map((order) => new Ordem(order));
  }
}
