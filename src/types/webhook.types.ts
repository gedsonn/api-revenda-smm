export interface PixWebhookPayload {
  pix: PixItem[];
}

export interface PixItem {
  endToEndId: string;
  txid: string;
  chave: string;
  valor: string;
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
