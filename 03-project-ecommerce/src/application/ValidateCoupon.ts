import { CouponData } from "../domain/data/CouponData";

type Output = {
  isExpired: boolean;
  discount: number;
};

export class ValidateCoupon {
  constructor(readonly couponData: CouponData) {}

  async execute(code: string, total: number): Promise<Output> {
    const coupon = await this.couponData.getCoupon(code);

    return {
      isExpired: coupon.isExpired(),
      discount: coupon.getDiscount(total),
    };
  }
}
