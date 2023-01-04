import pgp from "pg-promise";

import { Connection } from "./Connection";
import { envs } from "../../../config/env";

export class PgPromiseConnection implements Connection {
  pgp: any;

  constructor() {
    this.pgp = pgp()(envs.postgresUrlConnection);
  }

  query(statement: string, params: any): Promise<any> {
    return this.pgp.query(statement, params);
  }

  close(): Promise<void> {
    return this.pgp.$pool.end();
  }
}
