import { Product } from "./Product";

// Regra independente

export class FreightCalculator {
  /**
   * Inveja de dados, quando um metodo esta referenciando muitas vezes a entidade
   */
  static calculate(product: Product) {
    const volume = product.getVolume();
    const density = product.getDensity();
    const itemFreight = 1000 * volume * (density / 100);
    return itemFreight >= 10 ? itemFreight : 10;
  }
}
