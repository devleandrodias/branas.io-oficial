import "dotenv/config";

import env from "env-var";

export const envs = {
  appPort: env.get("APP_PORT").required().asPortNumber(),
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
