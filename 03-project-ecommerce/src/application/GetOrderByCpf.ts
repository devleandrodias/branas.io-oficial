import { OrderData } from "../domain/data/OrderData";

type Output = {
  total: number;
};

export class GetOrderByCpf {
  constructor(readonly orderData: OrderData) {}

  async execute(cpf: string): Promise<Output> {
    const order = await this.orderData.getByCpf(cpf);

    return {
      total: Number(order.total),
    };
  }
}
