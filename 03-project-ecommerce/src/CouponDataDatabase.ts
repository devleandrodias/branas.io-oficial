import pgp from "pg-promise";

import { envs } from "../config/env";
import { CouponData } from "./CouponData";

export class CouponDataDatabase implements CouponData {
  async getCoupon(code: string): Promise<any> {
    const connection = pgp()(envs.postgresUrlConnection);
    const [coupon] = await connection.query(
      "select * from cccat9.coupon where code = $1",
      [code]
    );
    await connection.$pool.end();
    return coupon;
  }
}
