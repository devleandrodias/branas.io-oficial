import { Cpf } from "./Cpf";
import { Item } from "./Item";
import { Coupon } from "./Coupon";
import { Product } from "./Product";
import { OrderCode } from "./OrderCode";
import { FreightCalculator } from "./FreightCalculator";

/**
 * Os use cases conhecem as entities, mas as entities nao conhecem os use cases
 */

export class Order {
  cpf: Cpf;
  code: OrderCode;
  items: Item[];
  coupon?: Coupon;
  freight: number = 0;

  constructor(cpf: string, date: Date = new Date(), sequence: number = 1) {
    this.cpf = new Cpf(cpf);
    this.code = new OrderCode(date, sequence);
    this.items = [];
  }

  addItem(
    product: Product,
    quantity: number,
    currencyCode: string = "BRL",
    currencyValue: number = 1
  ): void {
    const alreadyExistsProduct = this.items.some(
      (item) => item.idProduct === product.idProduct
    );

    if (alreadyExistsProduct) {
      throw new Error("Duplicated product");
    }

    this.items.push(
      new Item(
        product.idProduct,
        product.price,
        quantity,
        currencyCode,
        currencyValue
      )
    );

    this.freight += FreightCalculator.calculate(product);
  }

  addCoupon(coupon: Coupon): void {
    if (!coupon.isExpired()) {
      this.coupon = coupon;
    }
  }

  getCode() {
    return this.code.getValue();
  }

  getTotal() {
    let total = 0;

    for (const item of this.items) {
      total += item.getTotal();
    }

    if (this.coupon) {
      total -= this.coupon.getDiscount(total);
    }

    total += this.freight;

    return total;
  }
}
