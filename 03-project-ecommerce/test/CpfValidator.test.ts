import { validate } from "../src/CpfValidator";

const validCpfs = [
  "346.821.950-42",
  "181.693.290-60",
  "260.339.580-71",
  "683.229.380-12",
  "905.780.100-03",
  "138.662.330-00",
];

test("Deve testar um cpf valido", () => {
  const cpf = "346.821.950-42";
  const isValid = validate(cpf);
  expect(isValid).toBeTruthy();
});

test.each(validCpfs)("Deve testar um cpf valido: %s", (cpf) => {
  const isValid = validate(cpf);
  expect(isValid).toBeTruthy();
});

const invalidsCpfs = [
  "111.111.111-11",
  "222.222.222-22",
  "333.333.333-33",
  "444.444.444-44",
  "555.555.555-55",
  "666.666.666-66",
  "777.777.777-77",
  "888.888.888-88",
  "999.999.999-99",
  "000.000.000-00",
];

test.each(invalidsCpfs)("Deve testar um cpf invalido: %s", (cpf) => {
  const isValid = validate(cpf);
  expect(isValid).toBeFalsy();
});

test("Deve testar um cpf undefined", () => {
  const isValid = validate(undefined);
  expect(isValid).toBeFalsy();
});

test("Deve testar um cpf null", () => {
  const isValid = validate(null);
  expect(isValid).toBeFalsy();
});

test("Deve testar um cpf com tamanho errado", () => {
  const cpf = "123";
  const isValid = validate(cpf);
  expect(isValid).toBeFalsy();
});
