import { Connection } from "../database/Connection";
import { Product } from "../../domain/entities/Product";
import { ProductData } from "../../domain/data/ProductData";

export class ProductDataDatabase implements ProductData {
  constructor(readonly connection: Connection) {}
  async getProducts(idProduct: number): Promise<Product> {
    const [productData] = await this.connection.query(
      "select * from cccat9.product where id_product = $1",
      [idProduct]
    );

    await this.connection.close();

    if (!productData) {
      throw new Error("Product not found");
    }

    return new Product(
      productData.id_product,
      productData.description,
      Number(productData.price),
      Number(productData.width),
      Number(productData.height),
      Number(productData.length),
      Number(productData.weight),
      productData.currency
    );
  }
}
