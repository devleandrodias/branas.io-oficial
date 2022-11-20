import { calculateRide } from "../../src/v2/main";

test("Deve calcular uma corrida no primeiro dia do mes", () => {
  expect(
    calculateRide([{ distance: 10, date: new Date("2021-03-01T10:00:00") }])
  ).toBe(15);
});

test("Deve calcular uma corrida diurna em dias normais", () => {
  expect(
    calculateRide([{ distance: 10, date: new Date("2021-03-02T10:00:00") }])
  ).toBe(21);
});

test("Deve calcular uma corrida noturna", () => {
  expect(
    calculateRide([{ distance: 10, date: new Date("2021-03-04T23:00:00") }])
  ).toBe(39);
});

test("Deve calcular uma corrida diurna no domingo", () => {
  expect(
    calculateRide([{ distance: 10, date: new Date("2021-03-07T10:00:00") }])
  ).toBe(29);
});

test("Deve calcular uma corrida noturna no domingo", () => {
  expect(
    calculateRide([{ distance: 10, date: new Date("2021-03-07T23:00:00") }])
  ).toBe(50);
});

test("Nao deve calcular uma corrida com uma distancia inferior a 0", () => {
  expect(() =>
    calculateRide([{ distance: -10, date: new Date("2021-03-01T10:00:00") }])
  ).toThrowError("Invalid Distance");
});

test("Nao deve calcular uma corrida com data invalida", () => {
  expect(() =>
    calculateRide([{ distance: 10, date: new Date("abcdef") }])
  ).toThrowError("Invalid Date");
});

test("Deve calcular uma corrida com valor minimo", () => {
  expect(
    calculateRide([{ distance: 3, date: new Date("2021-03-01T10:00:00") }])
  ).toBe(10);
});
