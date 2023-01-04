import Axios from "axios";

Axios.defaults.validateStatus = function () {
  return true;
};

test("Nao deve fazer um pedido com CPF invalido", async () => {
  const input = { cpf: "101.101.101-10" };
  const response = await Axios.post("http://localhost:3000/checkout", input);
  expect(response.status).toBe(422);
  const output = response.data;
  expect(output.message).toBe("Invalid Cpf");
});

test.skip("Deve fazer um pedido com 3 produtos", async () => {
  const input = {
    cpf: "905.780.100-03",
    items: [
      { idProduct: 1, quantity: 1 },
      { idProduct: 2, quantity: 1 },
      { idProduct: 3, quantity: 3 },
    ],
  };

  const response = await Axios.post("http://localhost:3000/checkout", input);
  const output = response.data;
  expect(output.total).toBe(6350);
});

test.skip("Nao deve fazer pedido com produto que nao existe", async () => {
  const input = {
    cpf: "905.780.100-03",
    items: [{ idProduct: 5, quantity: 1 }],
  };

  const response = await Axios.post("http://localhost:3000/checkout", input);
  const output = response.data;
  expect(output.message).toBe("Product not found");
});

test.skip("Deve fazer um pedido com 3 produtos com cupom de desconto", async () => {
  const input = {
    cpf: "905.780.100-03",
    items: [
      { idProduct: 1, quantity: 1 },
      { idProduct: 2, quantity: 1 },
      { idProduct: 3, quantity: 3 },
    ],
    coupon: "VALE20",
  };

  const response = await Axios.post("http://localhost:3000/checkout", input);
  const output = response.data;
  expect(output.total).toBe(5132);
});

test.skip("Deve fazer um pedido com 3 produtos com cupom de desconto expirado", async () => {
  const input = {
    cpf: "905.780.100-03",
    items: [
      { idProduct: 1, quantity: 1 },
      { idProduct: 2, quantity: 1 },
      { idProduct: 3, quantity: 3 },
    ],
    coupon: "VALE20_EXPIRED",
  };

  const response = await Axios.post("http://localhost:3000/checkout", input);
  const output = response.data;
  expect(output.total).toBe(6350);
});

test.skip("Deve fazer um pedido com quantidade negativa", async () => {
  const input = {
    cpf: "905.780.100-03",
    items: [{ idProduct: 1, quantity: -1 }],
  };

  const response = await Axios.post("http://localhost:3000/checkout", input);
  expect(response.status).toBe(422);

  const output = response.data;
  expect(output.message).toBe("Quantity must be positive");
});

test.skip("Deve fazer um pedido com item duplicado", async () => {
  const input = {
    cpf: "905.780.100-03",
    items: [
      { idProduct: 1, quantity: 1 },
      { idProduct: 1, quantity: 1 },
    ],
  };

  const response = await Axios.post("http://localhost:3000/checkout", input);
  expect(response.status).toBe(422);

  const output = response.data;
  expect(output.message).toBe("Duplicated product");
});

test.skip("Deve fazer um pedido calculando o frete", async () => {
  const input = {
    cpf: "905.780.100-03",
    items: [{ idProduct: 1, quantity: 1 }],
  };

  const response = await Axios.post("http://localhost:3000/checkout", input);
  const output = response.data;
  expect(output.total).toBe(1030);
});

test.skip("Deve fazer um pedido calculando o frete minimo de 10 reais", async () => {
  const input = {
    cpf: "905.780.100-03",
    items: [{ idProduct: 3, quantity: 1 }],
  };

  const response = await Axios.post("http://localhost:3000/checkout", input);
  const output = response.data;
  expect(output.total).toBe(40);
});
