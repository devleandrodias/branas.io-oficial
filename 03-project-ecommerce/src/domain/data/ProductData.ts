import { Product } from "../entities/Product";

export interface ProductData {
  getProducts(idProduct: number): Promise<Product>;
}
