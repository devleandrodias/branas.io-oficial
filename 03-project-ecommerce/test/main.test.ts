import Axios from "axios";

Axios.defaults.validateStatus = function () {
  return true;
};

test("Nao deve fazer um pedido com CPF invalido", async () => {
  const input = { cpf: "101.101.101-10" };
  const response = await Axios.post("http://localhost:3000/checkout", input);
  expect(response.status).toBe(422);
  const output = response.data;
  expect(output.message).toBe("Invalid CPF");
});

test("Deve fazer um pedido com tres produtos", async () => {
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
  expect(output.total).toBe(6090);
});

test("Nao deve fazer pedido com produto que nao existe", async () => {
  const input = {
    cpf: "905.780.100-03",
    items: [{ idProduct: 4, quantity: 1 }],
  };

  const response = await Axios.post("http://localhost:3000/checkout", input);
  const output = response.data;
  expect(output.message).toBe("Product not found");
});

test("Deve fazer um pedido com 3 produtos com cupom de desconto", async () => {
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
  expect(output.total).toBe(4872);
});
