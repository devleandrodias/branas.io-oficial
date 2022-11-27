import "dotenv/config";

import env from "env-var";

export const envs = {
  postgresUrlConnection: env
    .get("POSTGRES_URL_CONNECTION")
    .required()
    .asString(),
  rabbitMqUrlConnection: env
    .get("RABBITMQ_URL_CONNECTION")
    .required()
    .asString(),
  rabbitMqCheckoutChannel: env
    .get("RABBITMQ_CHECKOUT_CHANNEL")
    .required()
    .asString(),
};
