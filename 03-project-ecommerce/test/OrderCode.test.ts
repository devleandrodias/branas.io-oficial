import { OrderCode } from "../src/domain/entities/OrderCode";

test("Deve criar um codigo para o pedido", () => {
  const orderCode = new OrderCode(new Date("2022-12-12T10:00:00"), 1);
  expect(orderCode.getValue()).toBe("202200000001");
});

test("Nao deve criar codigo do pedido se a sequence for negativa", () => {
  expect(() => new OrderCode(new Date("2022-12-12T10:00:00"), -1)).toThrow(
    "Invalid sequence"
  );
});
