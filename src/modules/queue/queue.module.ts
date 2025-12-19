import { Global, Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { SalesProcessor } from './processor/sales.processor';
import { SalesQueueService } from './sales.service';

@Global()
@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        username: 'red-cuejjjqj1k6c73cjt1tg',
        password: 'mn39wYSMKGcHGFhDoKvCpmEZLJXTU7dZ',
        host: 'oregon-keyvalue.render.com',
        port: 6379,
        tls: {
          rejectUnauthorized: false,
        },
      },
    }),
    BullModule.registerQueue({
      name: 'processSales',
    }),
  ],
  providers: [SalesProcessor, SalesQueueService],
  exports: [SalesQueueService],
})
export class QueueModule {}
