import { Coupon } from "../src/domain/entities/Coupon";

test("Deve testar o cupom", () => {
  const coupon = new Coupon("VALE20", 20, new Date("2023-12-10T00:00:00"));
  expect(coupon.isExpired()).toBeFalsy();
  expect(coupon.getDiscount(1000)).toBe(200);
});
