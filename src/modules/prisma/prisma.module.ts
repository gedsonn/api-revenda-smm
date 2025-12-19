import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { WalletRepo } from '../wallet/repository/wallet.repositort';
import { WallerRepositoryImpl } from './repository/wallet.repository.impl';
import { UserRepo } from '../user/repository/user.repository';
import { UserRepoImpl } from './repository/user.repository.impl';
import { ServiceRepo } from '../service/repository/service.repo';
import { ServiceRepoImpl } from './repository/service.repository.impl';
import { OrdemRepo } from '../ordem/repository/ordem.repository';
import { OrdemRepositoryImpl } from './repository/ordem.repository,impl';

@Global()
@Module({
  providers: [
    PrismaService,
    { provide: WalletRepo, useClass: WallerRepositoryImpl },
    { provide: UserRepo, useClass: UserRepoImpl },
    { provide: ServiceRepo, useClass: ServiceRepoImpl },
    { provide: OrdemRepo, useClass: OrdemRepositoryImpl },
  ],
  exports: [PrismaService, UserRepo, WalletRepo, ServiceRepo, OrdemRepo],
})
export class PrismaModule {}
