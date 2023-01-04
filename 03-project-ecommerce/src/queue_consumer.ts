import amqp from "amqplib";

import { envs } from "../config/env";
import { Checkout } from "./application/Checkout";
import { OrderDataDatabase } from "./infra/data/OrderDataDatabase";
import { CouponDataDatabase } from "./infra/data/CouponDataDatabase";
import { ProductDataDatabase } from "./infra/data/ProductDataDatabase";
import { PgPromiseConnection } from "./infra/database/PgPromiseConnection";

async function init() {
  const connectionQueue = await amqp.connect(envs.rabbitMqUrlConnection);
  const channel = await connectionQueue.createChannel();
  const connection = new PgPromiseConnection();

  await channel.consume(envs.rabbitMqCheckoutChannel, async (msg: any) => {
    const input = JSON.parse(msg.content.toString());
    try {
      const productData = new ProductDataDatabase(connection);
      const couponData = new CouponDataDatabase(connection);
      const orderData = new OrderDataDatabase(connection);

      const checkout = new Checkout(productData, couponData, orderData);
      const output = await checkout.execute(input);

      console.log(output);
    } catch (error: any) {
      console.log(error.message);
    } finally {
      channel.ack(msg);
    }
  });
}

init();
