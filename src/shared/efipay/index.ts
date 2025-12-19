import 'dotenv/config';
import path from 'path';
import EfiPay from 'sdk-node-apis-efi';

const client_id = process.env.EFI_CLIENT_ID;
const client_secret = process.env.EFI_CLIENT_SECRET;

if (!client_id || !client_secret) {
  throw new Error('variaveis de configuração não configuradas');
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const prod = path.join(process.cwd(), 'cert', 'prod.p12');
const homo = path.join(process.cwd(), 'cert', 'prod.p12');

export const options = {
  sandbox: true,
  client_id: client_id,
  client_secret: client_secret,
  certificate: homo,
};

export const efipay = new EfiPay(options);
