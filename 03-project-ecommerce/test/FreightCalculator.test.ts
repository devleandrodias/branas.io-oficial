import { FreightCalculator } from "../src/domain/entities/FreightCalculator";
import { Product } from "../src/domain/entities/Product";

test("Deve calcular o frete", () => {
  const product: Product = {
    width: 100,
    height: 30,
    length: 10,
    weight: 3,
    currency: "BRL",
    description: "test",
    idProduct: 1,
    price: 100,
  };

  const freight = FreightCalculator.calculate(product);
  expect(freight).toBe(30);
});

test("Deve calcular o frete minimo", () => {
  const product: Product = {
    width: 10,
    height: 10,
    length: 10,
    weight: 0.9,
    currency: "BRL",
    description: "test",
    idProduct: 1,
    price: 100,
  };

  const freight = FreightCalculator.calculate(product);
  expect(freight).toBe(10);
});
