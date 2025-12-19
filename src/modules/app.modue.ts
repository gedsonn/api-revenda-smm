import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { OrdemModule } from './ordem/ordem.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { ServiceModule } from './service/service.module';
import { WebhookModule } from './webhook/webhook.module';
import { QueueModule } from './queue/queue.module';
import { AppService } from './app.service';

@Module({
  controllers: [],
  providers: [AppService],
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    OrdemModule,
    UserModule,
    ServiceModule,
    WebhookModule,
    QueueModule,
  ],
})
export class AppModule {}
