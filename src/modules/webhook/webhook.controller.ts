import {
  Body,
  Controller,
  HttpCode,
  Logger,
  Post,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request } from 'express';
import { WebhookService } from './webhook.service';
import type { PixWebhookPayload } from '@/types/webhook.types';

@Controller('webhook')
export class WebhookController {
  private readonly logger = new Logger(WebhookController.name);
  constructor(private readonly webhookService: WebhookService) {}

  @Post('pix')
  @HttpCode(200)
  webhookHandler(@Req() req: Request, @Body() body: PixWebhookPayload) {
    const queryParams = req.query;
    if (queryParams.hmac !== process.env.EFI_WEBHOOK_SECRET) {
      throw new UnauthorizedException({ message: 'body inválido' });
    }

    this.webhookService.processWebhook(body).catch((err) => {
      this.logger.error(err);
    });

    return 'Olá mundo';
  }
}
