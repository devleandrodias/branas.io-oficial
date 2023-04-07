import { Product } from "../src/domain/entities/Product";

test("Deve calcular o volume do produto", () => {
  const product = new Product(1, "A", 1000, 100, 30, 10, 3, "BRL");
  expect(product.getVolume()).toBe(0.03);
});

test("Deve calcular a densidade do produto", () => {
  const product = new Product(1, "A", 1000, 100, 30, 10, 3, "BRL");
  expect(product.getDensity()).toBe(100);
});
