import { Coupon } from "../entities/Coupon";

export interface CouponData {
  getCoupon(code: string): Promise<Coupon>;
}
