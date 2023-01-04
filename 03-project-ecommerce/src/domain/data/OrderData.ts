import { Order } from "../entities/Order";

export interface OrderData {
  save(order: Order): Promise<void>;
  getByCpf(cpf: string): Promise<any>;
  count(): Promise<number>;
}
