import { Ordem } from '@/modules/ordem/entities/ordem.entity';

export abstract class OrdemRepo {
  abstract find(id: string): Promise<Ordem | null>;
  abstract findByUser(id: string, status: string): Promise<Ordem[]>;
  abstract findByTxid(txid: string): Promise<Ordem | null>;
  abstract create(ordem: Ordem): Promise<Ordem>;
}
