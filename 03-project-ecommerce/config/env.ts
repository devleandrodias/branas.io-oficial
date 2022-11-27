import "dotenv/config";

import env from "env-var";

export const envs = {
  postgresUrlConnection: env
    .get("POSTGRES_URL_CONNECTION")
    .required()
    .asString(),
};
