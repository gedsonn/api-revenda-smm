import { Processor, Process } from '@nestjs/bull';
import type { Job } from 'bull';

@Processor('processSales')
export class SalesProcessor {
  constructor() {}

  @Process('sales')
  handleCreatePix(job: Job) {
    console.log(job.data);
  }
}
