import { validateCpf } from "../../src/v2/main";

// Arrange, Act, Assert (AAA)

// Given, When, Then

const validCpfs = [
  "346.821.950-42",
  "181.693.290-60",
  "260.339.580-71",
  "683.229.380-12",
  "905.780.100-03",
  "138.662.330-00",
];

test("Deve testar um cpf valido", () => {
  // Given
  const cpf = "346.821.950-42";

  // When
  const isValid = validateCpf(cpf);

  // Then
  expect(isValid).toBeTruthy();
});

test.each(validCpfs)("Deve testar um cpf valido: %s", (cpf) => {
  const isValid = validateCpf(cpf);
  expect(isValid).toBeTruthy();
});

const invalidsCpfs = [
  "111.111.111-11",
  "555.555.555-55",
  "999.999.999-99",
  "000.000.000-00",
];

test.each(invalidsCpfs)("Deve testar um cpf invalido: %s", (cpf) => {
  const isValid = validateCpf(cpf);
  expect(isValid).toBeFalsy();
});

test("Deve testar um cpf undefined", () => {
  const isValid = validateCpf(undefined);
  expect(isValid).toBeFalsy();
});

test("Deve testar um cpf null", () => {
  const isValid = validateCpf(null);
  expect(isValid).toBeFalsy();
});

test("Deve testar um cpf com tamanho errado", () => {
  const cpf = "123";
  const isValid = validateCpf(cpf);
  expect(isValid).toBeFalsy();
});
