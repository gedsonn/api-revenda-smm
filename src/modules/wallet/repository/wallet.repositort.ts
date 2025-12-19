import { Wallet } from '../entities/wallet.entity';

export abstract class WalletRepo {
  abstract find(id: string): Promise<Wallet | null>;
  abstract create(data: Wallet): Promise<Wallet>;
  abstract findByUser(id: string): Promise<Wallet | null>;
  abstract delete(id: string): Promise<void>;
}
