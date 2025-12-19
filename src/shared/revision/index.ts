import {
  RevisionService,
  OrderResponse,
  OrderStatus,
  BalanceResponse,
} from './types';

export class RevisionSDK {
  private readonly apiKey: string;
  private readonly uri = 'https://revisionsmm.com/api/v2'; //url do ssm

  constructor(apiKey: string) {
    if (!apiKey) throw new Error('Revision API key not provided');
    this.apiKey = apiKey;
  }

  //montar o "agent"
  private async request<T>(
    action: string,
    payload: Record<string, any> = {},
  ): Promise<T> {
    const body = new URLSearchParams({
      key: this.apiKey,
      action,
      ...payload,
    });

    const res = await fetch(this.uri, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: body.toString(),
    });

    if (!res.ok) {
      throw new Error(`Revision API error: ${res.status}`);
    }

    return res.json();
  }

  /**
   * Lista todas os serviços ofertados pelo smm
   */
  getServices(): Promise<RevisionService[]> {
    return this.request<RevisionService[]>('services');
  }

  /**
   * criar um novo pedido no smm
   */
  createOrder(data: any): Promise<OrderResponse> {
    return this.request<OrderResponse>('add', data);
  }

  getOrderStatus(orderId: number): Promise<OrderStatus> {
    return this.request<OrderStatus>('status', {
      order: orderId,
    });
  }

  getMultiOrderStatus(
    orderIds: number[],
  ): Promise<Record<number, OrderStatus>> {
    return this.request<Record<number, OrderStatus>>('status', {
      orders: orderIds.join(','),
    });
  }

  refillOrder(orderId: number): Promise<{ refill: number }> {
    return this.request<{ refill: number }>('refill', {
      order: orderId,
    });
  }
  async getServiceByIdOrFail(id: number) {
    const services = await this.getServices();

    const service = services.find((s) => s.service === id);

    if (!service) {
      throw new Error(`Service not found`);
    }

    return service;
  }

  refillMultiple(
    orderIds: number[],
  ): Promise<{ order: number; refill: number }[]> {
    return this.request('refill', {
      orders: orderIds.join(','),
    });
  }

  getRefillStatus(refillId: number) {
    return this.request('refill_status', {
      refill: refillId,
    });
  }

  getMultiRefillStatus(refillIds: number[]) {
    return this.request('refill_status', {
      refills: refillIds.join(','),
    });
  }

  cancelOrders(orderIds: number[]) {
    return this.request('cancel', {
      orders: orderIds.join(','),
    });
  }

  getBalance(): Promise<BalanceResponse> {
    return this.request<BalanceResponse>('balance');
  }
}
