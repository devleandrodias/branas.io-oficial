import { Coupon } from "../src/domain/entities/Coupon";
import { Order } from "../src/domain/entities/Order";
import { Product } from "../src/domain/entities/Product";

test("Deve criar um pedido vazio com um CPF valido", () => {
  const order = new Order("905.780.100-03");
  expect(order.getTotal()).toBe(0);
});

test("Nao deve criar um pedido com CPF invalido", () => {
  expect(() => new Order("111.111.111-11")).toThrow(new Error("Invalid Cpf"));
});

test("Deve criar um pedido com 3 itens", () => {
  const order = new Order("905.780.100-03");
  order.addItem(new Product(1, "A", 1000, 100, 30, 10, 3), 1);
  order.addItem(new Product(2, "B", 5000, 50, 50, 50, 22), 1);
  order.addItem(new Product(3, "C", 30, 10, 10, 10, 1), 3);
  expect(order.getTotal()).toBe(6350);
});

test("Deve criar um pedido com 3 itens com cupom de desconto", () => {
  const order = new Order("905.780.100-03");
  order.addItem(new Product(1, "A", 1000, 100, 30, 10, 3), 1);
  order.addItem(new Product(2, "B", 5000, 50, 50, 50, 22), 1);
  order.addItem(new Product(3, "C", 30, 10, 10, 10, 1), 3);
  order.addCoupon(new Coupon("VALE20", 20, new Date("2023-01-01")));
  expect(order.getTotal()).toBe(5132);
});

test("Nao deve criar um pedido com quantidade negativa", () => {
  const order = new Order("905.780.100-03");
  expect(() =>
    order.addItem(new Product(1, "A", 1000, 100, 30, 10, 3), -1)
  ).toThrow(new Error("Quantity must be positive"));
});

test("Nao deve criar um pedido com item duplicado", () => {
  const order = new Order("905.780.100-03");
  order.addItem(new Product(1, "A", 1000, 100, 30, 10, 3), 1);
  expect(() =>
    order.addItem(new Product(1, "A", 1000, 100, 30, 10, 3), 1)
  ).toThrow(new Error("Duplicated product"));
});

test("Deve criar um pedido com 3 itens com codigo", () => {
  const order = new Order("905.780.100-03", new Date("2022-12-10"));
  order.addItem(new Product(1, "A", 1000, 100, 30, 10, 3), 1);
  order.addItem(new Product(2, "B", 5000, 50, 50, 50, 22), 1);
  order.addItem(new Product(3, "C", 30, 10, 10, 10, 1), 3);
  expect(order.getCode()).toBe("202200000001");
});
