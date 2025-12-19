import { Logger } from '@nestjs/common';
import https from 'https';
import fs from 'fs';
import axios from 'axios';
import { options } from '@/shared/efipay';

/**
 * Configura Webhook na efi
 *
 */
export async function ConfigureWebhook() {
  try {
    const pixKey = process.env.EFI_PIX_KEY!;
    const webhookUrl = process.env.EFI_PIX_WEBHOOK_URL!;
    const webhookSecret = process.env.EFI_WEBHOOK_SECRET!;

    const url = new URL(webhookUrl);
    url.searchParams.set('hmac', webhookSecret);
    url.searchParams.set('ignorar', '');

    Logger.log(`🔧 Configurando webhook Pix: ${url.toString()}`);

    const agent = new https.Agent({
      pfx: fs.readFileSync(options.certificate),
    });

    const auth = Buffer.from(
      `${options.client_id}:${options.client_secret}`,
    ).toString('base64');

    const tokenRes = await axios.post(
      'https://pix.api.efipay.com.br/oauth/token',
      { grant_type: 'client_credentials' },
      {
        headers: {
          Authorization: `Basic ${auth}`,
          'Content-Type': 'application/json',
        },
        httpsAgent: agent,
      },
    );

    const accessToken = tokenRes.data.access_token;

    const webhookRes = await axios.put(
      `https://pix.api.efipay.com.br/v2/webhook/${pixKey}`,
      { webhookUrl: url.toString() },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          'x-skip-mtls-checking': true,
        },
        httpsAgent: agent,
      },
    );

    Logger.log('Webhook configurado com sucesso');
    if (webhookRes.data.erros && webhookRes.data.erros.length) {
      Logger.warn('Erros ao configurar webhook:', webhookRes.data.erros);
    }
  } catch (err: any) {
    this.logger.error('Erro ao configurar webhook Pix', err);
  }
}
