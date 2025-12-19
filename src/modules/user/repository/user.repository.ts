import { User } from '@/modules/user/entities/user.entity';

export abstract class UserRepo {
  abstract find(id: string): Promise<User | null>;
  abstract create(user: User): Promise<User>;
}
