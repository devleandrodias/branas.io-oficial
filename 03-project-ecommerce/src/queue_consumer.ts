import amqp from "amqplib";
import pgp from "pg-promise";

import { envs } from "../config/env";
import { validate } from "./CpfValidator";

async function init() {
  const connectionPostgres = pgp()(envs.postgresUrlConnection);
  const connectionQueue = await amqp.connect(envs.rabbitMqUrlConnection);

  const channel = await connectionQueue.createChannel();

  await channel.consume(envs.rabbitMqCheckoutChannel, async (msg: any) => {
    const input = JSON.parse(msg.content.toString());

    const isValid = validate(input.cpf);

    if (!isValid) {
      console.log("Invalid CPF");
      return;
    } else {
      let total = 0;
      let freight = 0;

      const productsIds: number[] = [];

      for (const item of input.items) {
        if (productsIds.some((productId) => productId === item.idProduct)) {
          console.log("Duplicated product");
          return;
        }

        productsIds.push(item.idProduct);

        const [product] = await connectionPostgres.query(
          "select * from cccat9.product where id_product = $1",
          [item.idProduct]
        );

        if (!product) {
          console.log("Product not found");
          return;
        } else {
          if (item.quantity <= 0) {
            console.log("Quantity must be positive");
            return;
          }

          total += Number(product.price) * item.quantity;

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
        const [coupon] = await connectionPostgres.query(
          "select * from cccat9.coupon where code = $1",
          [input.coupon]
        );

        const today = new Date();

        if (coupon && coupon.expire_date.getTime() > today.getTime()) {
          total -= (total * coupon.percentage) / 100;
        }
      }

      total += freight;

      console.log({ total });
    }

    channel.ack(msg);
  });
}

init();
