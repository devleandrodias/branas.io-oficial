import pgp from "pg-promise";

import { envs } from "../config/env";
import { ProductData } from "./ProductData";

export class ProductDataDatabase implements ProductData {
  async getProducts(idProduct: number): Promise<any> {
    const connection = pgp()(envs.postgresUrlConnection);
    const [product] = await connection.query(
      "select * from cccat9.product where id_product = $1",
      [idProduct]
    );
    await connection.$pool.end();
    return product;
  }
}
