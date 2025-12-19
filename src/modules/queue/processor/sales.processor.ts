import { Processor, Process } from '@nestjs/bull';
import type { Job } from 'bull';

@Processor('processSales')
export class SalesProcessor {
  constructor() {}

  @Process('sales')
  handleCreatePix(job: Job) {
    const { userId, amount, pixKey } = job.data;

    console.log(
      `Processando Pix para usuário ${userId} valor ${amount} pixKey ${pixKey}`,
    );
  }
}
