import sinon from "sinon";

import { Mailer } from "../src/Mailer";
import { Checkout } from "../src/Checkout";
import { CouponData } from "../src/CouponData";
import { ProductData } from "../src/ProductData";
import { MailerConsole } from "../src/MailerConsole";
import { CurrencyGateway } from "../src/CurrencyGateway";
import { CurrencyGatewayFaker } from "../src/CurrencyGatewayFaker";
import { CurrencyGatewayRandom } from "../src/CurrencyGatewayRandom";

test("Deve fazer um pedido com 3 produtos", async () => {
  const input = {
    cpf: "905.780.100-03",
    items: [
      { idProduct: 1, quantity: 1 },
      { idProduct: 2, quantity: 1 },
      { idProduct: 3, quantity: 3 },
    ],
  };

  const productData: ProductData = {
    getProducts: async function (idProduct: number): Promise<any> {
      const products: {
        [idProduct: number]: {
          idProduct: number;
          description: string;
          price: number;
          width: number;
          height: number;
          length: number;
          weight: number;
        };
      } = {
        1: {
          idProduct: 1,
          description: "A",
          price: 1000,
          width: 100,
          height: 30,
          length: 10,
          weight: 3,
        },
        2: {
          idProduct: 2,
          description: "B",
          price: 5000,
          width: 50,
          height: 50,
          length: 50,
          weight: 22,
        },
        3: {
          idProduct: 1,
          description: "C",
          price: 30,
          width: 10,
          height: 10,
          length: 10,
          weight: 0.9,
        },
      };

      return products[idProduct];
    },
  };

  const couponData: CouponData = {
    getCoupon: async function (code: string): Promise<any> {
      const coupons: {
        [code: string]: { code: string; percentage: number; expire_date: Date };
      } = {
        VALE20: {
          code: "VALE20",
          percentage: 20,
          expire_date: new Date("2022-12-01T10:00:00"),
        },
        VALE20_EXPIRED: {
          code: "VALE20_EXPIRED",
          percentage: 20,
          expire_date: new Date("2022-11-01T10:00:00"),
        },
      };
      return coupons[code];
    },
  };

  const currencyGateway = new CurrencyGatewayRandom();
  const checkout = new Checkout(productData, couponData, currencyGateway);
  const output = await checkout.execute(input);

  expect(output.total).toBe(6350);
});

test("Deve fazer um pedido com 4 produtos com moedas diferentes", async () => {
  // STUB
  const currencyGatewayStup = sinon
    .stub(CurrencyGatewayRandom.prototype, "getCurrencies")
    .resolves({
      USD: 2,
      BRL: 1,
    });

  // SPY
  const mailerSpy = sinon.spy(MailerConsole.prototype, "send");

  const input = {
    cpf: "905.780.100-03",
    // Dummy
    email: "leandro@branas.io",
    items: [
      { idProduct: 1, quantity: 1 },
      { idProduct: 2, quantity: 1 },
      { idProduct: 3, quantity: 3 },
      { idProduct: 4, quantity: 1 },
    ],
  };

  const productData: ProductData = {
    getProducts: async function (idProduct: number): Promise<any> {
      const products: {
        [idProduct: number]: {
          idProduct: number;
          description: string;
          price: number;
          width: number;
          height: number;
          length: number;
          weight: number;
          currency: string;
        };
      } = {
        1: {
          idProduct: 1,
          description: "A",
          price: 1000,
          width: 100,
          height: 30,
          length: 10,
          weight: 3,
          currency: "BRL",
        },
        2: {
          idProduct: 2,
          description: "B",
          price: 5000,
          width: 50,
          height: 50,
          length: 50,
          weight: 22,
          currency: "BRL",
        },
        3: {
          idProduct: 1,
          description: "C",
          price: 30,
          width: 10,
          height: 10,
          length: 10,
          weight: 0.9,
          currency: "BRL",
        },
        4: {
          idProduct: 4,
          description: "D",
          price: 100,
          width: 100,
          height: 30,
          length: 10,
          weight: 3,
          currency: "USD",
        },
      };

      return products[idProduct];
    },
  };

  const couponData: CouponData = {
    getCoupon: async function (code: string): Promise<any> {
      const coupons: {
        [code: string]: { code: string; percentage: number; expire_date: Date };
      } = {
        VALE20: {
          code: "VALE20",
          percentage: 20,
          expire_date: new Date("2022-12-01T10:00:00"),
        },
        VALE20_EXPIRED: {
          code: "VALE20_EXPIRED",
          percentage: 20,
          expire_date: new Date("2022-11-01T10:00:00"),
        },
      };
      return coupons[code];
    },
  };

  const currencyGateway = new CurrencyGatewayRandom();
  const checkout = new Checkout(productData, couponData, currencyGateway);
  const output = await checkout.execute(input);

  expect(output.total).toBe(6580);
  expect(mailerSpy.calledOnce).toBeTruthy();
  expect(
    mailerSpy.calledWith("leandro@branas.io", "Checkout success", "ABC")
  ).toBeTruthy();

  mailerSpy.restore();
  currencyGatewayStup.restore();
});

test("Deve fazer um pedido com 4 produtos com moedas diferentes", async () => {
  const currencyGatewayStup = sinon
    .stub(CurrencyGatewayRandom.prototype, "getCurrencies")
    .resolves({
      USD: 2,
      BRL: 1,
    });

  const mailerSpy = sinon.spy(MailerConsole.prototype, "send");

  const input = {
    cpf: "905.780.100-03",
    email: "leandro@branas.io",
    items: [
      { idProduct: 1, quantity: 1 },
      { idProduct: 2, quantity: 1 },
      { idProduct: 3, quantity: 3 },
      { idProduct: 4, quantity: 1 },
    ],
  };

  const productData: ProductData = {
    getProducts: async function (idProduct: number): Promise<any> {
      const products: {
        [idProduct: number]: {
          idProduct: number;
          description: string;
          price: number;
          width: number;
          height: number;
          length: number;
          weight: number;
          currency: string;
        };
      } = {
        1: {
          idProduct: 1,
          description: "A",
          price: 1000,
          width: 100,
          height: 30,
          length: 10,
          weight: 3,
          currency: "BRL",
        },
        2: {
          idProduct: 2,
          description: "B",
          price: 5000,
          width: 50,
          height: 50,
          length: 50,
          weight: 22,
          currency: "BRL",
        },
        3: {
          idProduct: 1,
          description: "C",
          price: 30,
          width: 10,
          height: 10,
          length: 10,
          weight: 0.9,
          currency: "BRL",
        },
        4: {
          idProduct: 4,
          description: "D",
          price: 100,
          width: 100,
          height: 30,
          length: 10,
          weight: 3,
          currency: "USD",
        },
      };

      return products[idProduct];
    },
  };

  const couponData: CouponData = {
    getCoupon: async function (code: string): Promise<any> {
      const coupons: {
        [code: string]: { code: string; percentage: number; expire_date: Date };
      } = {
        VALE20: {
          code: "VALE20",
          percentage: 20,
          expire_date: new Date("2022-12-01T10:00:00"),
        },
        VALE20_EXPIRED: {
          code: "VALE20_EXPIRED",
          percentage: 20,
          expire_date: new Date("2022-11-01T10:00:00"),
        },
      };
      return coupons[code];
    },
  };

  const currencyGateway = new CurrencyGatewayRandom();
  const checkout = new Checkout(productData, couponData, currencyGateway);
  const output = await checkout.execute(input);

  expect(output.total).toBe(6580);
  expect(mailerSpy.calledOnce).toBeTruthy();
  expect(
    mailerSpy.calledWith("leandro@branas.io", "Checkout success", "ABC")
  ).toBeTruthy();

  mailerSpy.restore();
  currencyGatewayStup.restore();
});

test("Deve fazer um pedido com 4 produtos com moedas diferentes com mock", async () => {
  const input = {
    cpf: "905.780.100-03",
    email: "leandro@branas.io",
    items: [
      { idProduct: 1, quantity: 1 },
      { idProduct: 2, quantity: 1 },
      { idProduct: 3, quantity: 3 },
      { idProduct: 4, quantity: 1 },
    ],
  };

  const productData: ProductData = {
    getProducts: async function (idProduct: number): Promise<any> {
      const products: {
        [idProduct: number]: {
          idProduct: number;
          description: string;
          price: number;
          width: number;
          height: number;
          length: number;
          weight: number;
          currency: string;
        };
      } = {
        1: {
          idProduct: 1,
          description: "A",
          price: 1000,
          width: 100,
          height: 30,
          length: 10,
          weight: 3,
          currency: "BRL",
        },
        2: {
          idProduct: 2,
          description: "B",
          price: 5000,
          width: 50,
          height: 50,
          length: 50,
          weight: 22,
          currency: "BRL",
        },
        3: {
          idProduct: 1,
          description: "C",
          price: 30,
          width: 10,
          height: 10,
          length: 10,
          weight: 0.9,
          currency: "BRL",
        },
        4: {
          idProduct: 4,
          description: "D",
          price: 100,
          width: 100,
          height: 30,
          length: 10,
          weight: 3,
          currency: "USD",
        },
      };

      return products[idProduct];
    },
  };

  const couponData: CouponData = {
    getCoupon: async function (code: string): Promise<any> {
      const coupons: {
        [code: string]: { code: string; percentage: number; expire_date: Date };
      } = {
        VALE20: {
          code: "VALE20",
          percentage: 20,
          expire_date: new Date("2022-12-01T10:00:00"),
        },
        VALE20_EXPIRED: {
          code: "VALE20_EXPIRED",
          percentage: 20,
          expire_date: new Date("2022-11-01T10:00:00"),
        },
      };
      return coupons[code];
    },
  };

  // FAKER
  const mailerFaker: Mailer = {
    send: function (to: string, subject: string, message: string): void {
      console.log("Mailer faker...");
    },
  };
  const currencyGateway: CurrencyGateway = new CurrencyGatewayFaker();

  const checkout = new Checkout(
    productData,
    couponData,
    currencyGateway,
    mailerFaker
  );
  const output = await checkout.execute(input);

  expect(output.total).toBe(6580);
});
