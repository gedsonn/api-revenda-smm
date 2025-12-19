import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import type { Queue } from 'bull';
import { PixWebhookPayload } from '@/types/webhook.types';

interface SalesData {
  ordemId: string;
  dataWebhook: PixWebhookPayload;
}

@Injectable()
export class SalesQueueService {
  constructor(@InjectQueue('processSales') private salesQueue: Queue) {}

  async addSalesJob(data: SalesData) {
    await this.salesQueue.add('sales', data, {
      attempts: 3, // tenta até 3x se falhar
      backoff: 5000, // 5s entre tentativas
    });
  }
}
