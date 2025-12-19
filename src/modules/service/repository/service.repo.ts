import { Service } from '@/modules/service/entity/service.entity';

export abstract class ServiceRepo {
  abstract find(id: number): Promise<Service | null>;
  abstract findAll(): Promise<Service[]>;
  abstract createMany(services: Service[]): Promise<Service[]>;
  abstract upsertMany(services: Service[]): Promise<void>;
  abstract create(service: Service): Promise<Service>;
  abstract update(id: number, service: Service): Promise<Service>;
  abstract delete(id: number): Promise<void>;
}
