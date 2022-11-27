import amqp from "amqplib";
import { envs } from "../config/env";

async function init() {
  const connection = await amqp.connect(envs.rabbitMqUrlConnection);

  const channel = await connection.createChannel();
  await channel.assertQueue(envs.rabbitMqCheckoutChannel, { durable: true });
  const input = {
    cpf: "905.780.100-03",
    items: [
      { idProduct: 1, quantity: 1 },
      { idProduct: 2, quantity: 1 },
      { idProduct: 3, quantity: 3 },
    ],
  };
  channel.sendToQueue(
    envs.rabbitMqCheckoutChannel,
    Buffer.from(JSON.stringify(input))
  );
}

init();
