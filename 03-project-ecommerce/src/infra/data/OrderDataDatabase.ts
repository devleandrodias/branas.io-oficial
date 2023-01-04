import { Order } from "../../domain/entities/Order";
import { Connection } from "../database/Connection";
import { OrderData } from "../../domain/data/OrderData";

export class OrderDataDatabase implements OrderData {
  constructor(readonly connection: Connection) {}

  async save(order: Order): Promise<void> {
    await this.connection.query(
      "insert into cccat9.order (cpf, total) values ($1, $2)",
      [order.cpf.getValue(), order.getTotal()]
    );

    await this.connection.close();
  }

  async getByCpf(cpf: string): Promise<any> {
    const [orderData] = await this.connection.query(
      "select * from cccat9.order where cpf = $1",
      [cpf]
    );
    await this.connection.close();
    return orderData;
  }

  async count(): Promise<number> {
    const [options] = await this.connection.query(
      "select count(*)::integer as count from cccat9.order ",
      []
    );
    await this.connection.close();
    return options.count;
  }
}
