export class Coupon {
  constructor(
    readonly code: string,
    readonly percentage: number,
    readonly expiredDate: Date
  ) {}

  isExpired() {
    const today = new Date();
    return this.expiredDate.getTime() < today.getTime();
  }

  getDiscount(total: number) {
    return (total * this.percentage) / 100;
  }
}
