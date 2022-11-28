import { Mailer } from "./Mailer";
import { validate } from "./CpfValidator";
import { CouponData } from "./CouponData";
import { ProductData } from "./ProductData";
import { MailerConsole } from "./MailerConsole";
import { CurrencyGateway } from "./CurrencyGateway";

export class Checkout {
  constructor(
    readonly productData: ProductData,
    readonly couponData: CouponData,
    readonly currencyGateway: CurrencyGateway,
    readonly mailer: Mailer = new MailerConsole()
  ) {}

  async execute(input: Input) {
    const isValid = validate(input.cpf);

    if (!isValid) {
      throw new Error("Invalid CPF");
    } else {
      let total = 0;
      let freight = 0;

      const currencies: any = await this.currencyGateway.getCurrencies();

      const productsIds: number[] = [];

      for (const item of input.items) {
        if (productsIds.some((productId) => productId === item.idProduct)) {
          throw new Error("Duplicated product");
        }

        productsIds.push(item.idProduct);

        const product = await this.productData.getProducts(item.idProduct);

        if (!product) {
          throw new Error("Product not found");
        } else {
          if (item.quantity <= 0) {
            throw new Error("Quantity must be positive");
          }

          total +=
            Number(product.price) *
            (currencies[product.currency] || 1) *
            item.quantity;

          const volume =
            (product.width / 100) *
            (product.height / 100) *
            (product.length / 100);

          const density = Number(product.weight) / volume;
          const itemFreight = 1000 * volume * (density / 100);
          freight += itemFreight >= 10 ? itemFreight : 10;
        }
      }

      if (input.coupon) {
        const coupon = await this.couponData.getCoupon(input.coupon);

        const today = new Date();

        if (coupon && coupon.expire_date.getTime() > today.getTime()) {
          total -= (total * coupon.percentage) / 100;
        }
      }

      total += freight;

      if (input.email) {
        this.mailer.send(input.email, "Checkout success", "ABC");
      }

      return { total };
    }
  }
}

type Item = {
  idProduct: number;
  quantity: number;
};

type Input = {
  cpf: string;
  email?: string;
  items: Item[];
  coupon?: string;
};
