import 'dotenv/config';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrdemDTO } from './dto/CreateOrdemDTO';
import { ConfigService } from '@nestjs/config';
import { UserRepo } from '../user/repository/user.repository';
import { User } from '../user/entities/user.entity';
import { efipay } from '@/shared/efipay';
import { Ordem } from './entities/ordem.entity';
import { ServiceRepo } from '../service/repository/service.repo';
import { RevisionSDK } from '@/shared/revision';
import { Service } from '../service/entity/service.entity';
import { OrdemRepo } from './repository/ordem.repository';
import { PixQueueService } from '../queue/sales.service';

@Injectable()
export class OrdemService {
  constructor(
    private readonly config: ConfigService,
    private readonly userRepo: UserRepo,
    private readonly serviceRepo: ServiceRepo,
    private readonly ordemRepo: OrdemRepo,
    private readonly queueService: PixQueueService,
  ) {}

  async createOrdem(dto: CreateOrdemDTO) {
    const serviceId = Number(dto.service);
    let service = await this.serviceRepo.find(serviceId);

    const ONE_DAY_MS = 24 * 60 * 60 * 1000;

    const needsUpdate =
      !service || service.updatedAt.getTime() < Date.now() - ONE_DAY_MS;

    if (needsUpdate) {
      const sdk = new RevisionSDK(this.config.get<string>('API_REVISION')!);

      const remoteService = await sdk
        .getServiceByIdOrFail(serviceId)
        .catch((err) => {
          if (err.message === 'Service not found') {
            throw new NotFoundException({
              message: 'Serviço não encontrado',
              details: { id: serviceId },
            });
          }
          throw err;
        });

      const updated = new Service({
        id: serviceId,
        name: remoteService.name,
        price: Math.round(Number(remoteService.rate) * 100), // centavos
        min: remoteService.min,
        max: remoteService.max,
        category: remoteService.category,
        type: 'default',
        createdAt: service?.createdAt ?? new Date(),
        updatedAt: new Date(),
      });

      service = service
        ? await this.serviceRepo.update(serviceId, updated)
        : await this.serviceRepo.create(updated);
    }

    if (!service) throw new NotFoundException('Serviço não encontrado');

    let user = await this.userRepo.find(dto.comprador);

    if (!user) {
      user = await this.userRepo.create(
        new User({
          id: dto.comprador,
          username: dto.comprador,
        }),
      );
    }

    const totalPix = (service.price / 100).toFixed(2);

    const charge = await efipay.pixCreateImmediateCharge(
      {},
      {
        calendario: { expiracao: 3600 },
        valor: { original: totalPix },
        chave: this.config.get<string>('EFI_PIX_KEY')!,
        solicitacaoPagador: `Ordem ${dto.service} | ${user.id}`,
      },
    );

    const qrCode = await efipay.pixGenerateQRCode({
      id: charge.loc.id,
    });

    const ordem = new Ordem({
      id: crypto.randomUUID(),
      status: 'AWAIT_PAYMENT',
      compradorId: user.id,
      serviceId: Number(dto.service),
      txid: charge.txid,
      pix: {
        qrcode: qrCode.qrcode,
        imagemQrcode: qrCode.imagemQrcode,
        expiraEm: Date.now() + 3600 * 1000,
      },
      keyId: 'e32a81f5-0ae0-4c30-9d08-8d39cb9f7252',
      extra: {},
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const od = await this.ordemRepo.create(ordem);

    return {
      ordem: {
        id: od.id,
        status: od.status,
        compradorId: od.compradorId,
        serviceId: od.serviceId,
        txid: od.txid,
        pix: od.pix,
        createdAt: od.createdAt,
      },
    };
  }
}
