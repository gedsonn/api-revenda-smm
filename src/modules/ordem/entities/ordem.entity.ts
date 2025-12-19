import { OrdemStatus } from '@/generated/prisma/client';

export type OrdemProps = {
  id: string;
  status: OrdemStatus;

  extra: unknown; // { ordem: string } (revision)

  compradorId: string;
  serviceId: number;

  txid: string;
  pix?: unknown;

  keyId: string;

  createdAt: Date;
  updatedAt: Date;
};

export class Ordem {
  constructor(private readonly props: OrdemProps) {}

  // 🔑 Identidade
  get id() {
    return this.props.id;
  }

  // 📌 Status
  get status() {
    return this.props.status;
  }

  // 👤 Comprador
  get compradorId() {
    return this.props.compradorId;
  }

  // 🧩 Serviço
  get serviceId() {
    return this.props.serviceId;
  }

  // 💳 PIX
  get txid() {
    return this.props.txid;
  }

  get pix() {
    return this.props.pix;
  }

  // 🔐 API key
  get keyId() {
    return this.props.keyId;
  }

  // 📦 Extra (Revision)
  get extra() {
    return this.props.extra;
  }

  // 🕒 Datas
  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  // =========================
  // 🔄 Regras de domínio
  // =========================

  markAwaitPayment() {
    this.ensureStatus(['PENDING']);
    this.props.status = 'AWAIT_PAYMENT';
  }

  markProcessing() {
    this.ensureStatus(['AWAIT_PAYMENT']);
    this.props.status = 'PROCESSING';
  }

  markDone() {
    this.ensureStatus(['PROCESSING']);
    this.props.status = 'DONE';
  }

  markFailed() {
    this.ensureStatus(['PROCESSING']);
    this.props.status = 'FAILED';
  }

  markCanceled() {
    this.ensureStatus(['AWAIT_PAYMENT', 'PROCESSING']);
    this.props.status = 'CANCELED';
  }

  markRefunded() {
    this.ensureStatus(['FAILED', 'CANCELED']);
    this.props.status = 'REFUNDED';
  }

  attachPix(pix: unknown) {
    this.props.pix = pix;
  }

  attachRevisionOrder(data: unknown) {
    this.props.extra = data;
  }

  private ensureStatus(allowed: OrdemStatus[]) {
    if (!allowed.includes(this.props.status)) {
      throw new Error(`Transição inválida de status: ${this.props.status}`);
    }
  }
}
