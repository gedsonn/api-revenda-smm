export interface RevisionService {
  service: number;
  name: string;
  rate: string;
  min: number;
  max: number;
  category: string;
}

export interface OrderResponse {
  order: number;
}

export interface OrderStatus {
  status: string;
  charge: string;
  remains: number;
  start_count: number;
  currency: string;
}

export interface BalanceResponse {
  balance: string;
  currency: string;
}
