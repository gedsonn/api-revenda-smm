import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import type { Queue } from 'bull';

export interface PixJobData {
  userId: string;
  amount: number; // centavos
  pixKey: string;
}

@Injectable()
export class PixQueueService {
  constructor(@InjectQueue('processSales') private pixQueue: Queue) {}

  async addPixJob(data: PixJobData) {
    await this.pixQueue.add('sales', data, {
      attempts: 3, // tenta até 3x se falhar
      backoff: 5000, // 5s entre tentativas
    });
  }
}
