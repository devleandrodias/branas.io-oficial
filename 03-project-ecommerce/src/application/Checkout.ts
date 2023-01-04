import { Order } from "../domain/entities/Order";
import { Mailer } from "../infra/mailer/Mailer";
import { OrderData } from "../domain/data/OrderData";
import { CouponData } from "../domain/data/CouponData";
import { ProductData } from "../domain/data/ProductData";
import { MailerConsole } from "../infra/mailer/MailerConsole";
import { CurrencyGateway } from "../infra/gateway/CurrencyGateway";
import { CurrencyGatewayRandom } from "../infra/gateway/CurrencyGatewayRandom";

export class Checkout {
  constructor(
    readonly productData: ProductData,
    readonly couponData: CouponData,
    readonly orderData: OrderData,
    readonly currencyGateway: CurrencyGateway = new CurrencyGatewayRandom(),
    readonly mailer: Mailer = new MailerConsole()
  ) {}

  async execute(input: Input) {
    const currencies = await this.currencyGateway.getCurrencies();
    const order = new Order(input.cpf);

    for (const item of order.items) {
      const product = await this.productData.getProducts(item.idProduct);
      const currencyValue = currencies.getCurrency(product.currency);
      order.addItem(product, item.quantity, product.currency, currencyValue);
    }

    if (input.coupon) {
      const coupon = await this.couponData.getCoupon(input.coupon);
      order.addCoupon(coupon);
    }

    await this.orderData.save(order);

    return {
      code: order.getCode(),
      total: order.getTotal(),
    };
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
