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

export interface PixWebhookPayload {
  pix: PixItem[];
}

export interface PixItem {
  endToEndId: string;
  txid: string;
  chave: string;
  valor: string; // string porque vem formatado, ex: "0.10"
  horario: string; // ISO date string
  infoPagador: string;
  gnExtras: GnExtras;
}

export interface GnExtras {
  pagador: Pagador;
}

export interface Pagador {
  nome: string;
  cpf: string;
  codigoBanco: string;
}

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

    return 'Olá mundo';
  }
}
