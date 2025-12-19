import { Injectable } from '@nestjs/common';
import { SalesQueueService } from '../queue/sales.service';
import type { PixWebhookPayload } from '@/types/webhook.types';
import { OrdemRepo } from '../ordem/repository/ordem.repository';

@Injectable()
export class WebhookService {
  constructor(
    private readonly queue: SalesQueueService,
    private readonly ordemRepo: OrdemRepo,
  ) {}

  async processWebhook(data: PixWebhookPayload) {
    const ordem = await this.ordemRepo.findByTxid(data.pix[0].txid);
    if (!ordem) return;

    //enviar para processar a venda na fila
    this.queue
      .addSalesJob({
        ordemId: ordem.id,
        dataWebhook: data,
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
