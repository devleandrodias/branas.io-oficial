import { ProductData } from "../domain/data/ProductData";
import { FreightCalculator } from "../domain/entities/FreightCalculator";

type Input = {
  items: { idProduct: number; quantity: number }[];
};

type Output = {
  total: number;
};

// Regra aplicada

export class SimulateFreight {
  constructor(readonly productData: ProductData) {}

  async execute(input: Input): Promise<Output> {
    let total = 0;
    for (const item of input.items) {
      const product = await this.productData.getProducts(item.idProduct);
      total += FreightCalculator.calculate(product);
    }

    return { total };
  }
}
