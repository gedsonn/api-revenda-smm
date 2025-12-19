import { Injectable } from '@nestjs/common';
import { PixQueueService } from '../queue/pro.service';
import { PixWebhookPayload } from './webhook.controller';
import { OrdemRepo } from '../ordem/repository/ordem.repository';

@Injectable()
export class WebhookService {
  constructor(
    private readonly queue: PixQueueService,
    private readonly ordemRepo: OrdemRepo,
  ) {}

  async processWebhook(data: PixWebhookPayload) {
    const ordem = await this.ordemRepo.findByTxid(data.pix[0].txid);
    if (!ordem) return;

    this.queue
      .addPixJob({
        userId: ordem.compradorId,
        amount: 100,
        pixKey: '',
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
