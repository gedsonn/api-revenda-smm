import { ServiceRepo } from '@/modules/service/repository/service.repo';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Service } from '@/modules/service/entity/service.entity';

@Injectable()
export class ServiceRepoImpl implements ServiceRepo {
  constructor(private readonly prisma: PrismaService) {}

  async upsertMany(services: Service[]): Promise<void> {
    const CONCURRENCY = 20;

    for (let i = 0; i < services.length; i += CONCURRENCY) {
      const chunk = services.slice(i, i + CONCURRENCY);

      await Promise.all(
        chunk.map((s) =>
          this.prisma.service.upsert({
            where: { id: s.id },
            update: {
              name: s.name,
              price: s.price,
              min: s.min,
              max: s.max,
              category: s.category,
              type: s.type,
            },
            create: {
              id: s.id,
              name: s.name,
              price: s.price,
              min: s.min,
              max: s.max,
              category: s.category,
              type: s.type,
            },
          }),
        ),
      );
    }
  }

  async find(id: number): Promise<Service | null> {
    const service = await this.prisma.service.findUnique({
      where: { id },
    });

    if (!service) return null;

    return new Service(service);
  }

  async findAll(): Promise<Service[]> {
    const services = await this.prisma.service.findMany();

    return services.map((service) => new Service(service));
  }

  async createMany(services: Service[]): Promise<Service[]> {
    await this.prisma.service.createMany({
      data: services.map((service) => ({
        id: service.id,
        name: service.name,
        price: service.price,
        min: service.min,
        max: service.max,
        category: service.category,
        type: service.type,
      })),
      skipDuplicates: true,
    });

    return services;
  }

  async create(service: Service): Promise<Service> {
    const sv = await this.prisma.service.create({
      data: {
        id: service.id,
        name: service.name,
        price: service.price,
        min: service.min,
        max: service.max,
        category: service.category,
        type: service.type,
      },
    });

    return new Service(sv);
  }

  async update(id: number, service: Service): Promise<Service> {
    const sv = await this.prisma.service.update({
      where: { id },
      data: {
        name: service.name,
        price: service.price,
        min: service.min,
        max: service.max,
        category: service.category,
        type: service.type,
      },
    });

    return new Service(sv);
  }

  async delete(id: number): Promise<void> {
    await this.prisma.service.delete({
      where: { id },
    });

    return;
  }
}
