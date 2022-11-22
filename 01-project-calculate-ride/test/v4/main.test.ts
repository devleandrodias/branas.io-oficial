import { Ride } from "../../src/v4/Ride";

import { NormalFareCalculatorHandler } from "../../src/v4/handlers/NormalFareCalculatorHandler";
import { SundayFareCalculatorHandler } from "../../src/v4/handlers/SundayFareCalculatorHandler";
import { OvernightFareCalculatorHandler } from "../../src/v4/handlers/OvernightFareCalculatorHandler";
import { SpecialDayFareCalculatorHandler } from "../../src/v4/handlers/SpecialDayFareCalculatorHandler";
import { OvernightSundayCalculatorHandler } from "../../src/v4/handlers/OvernightSundayFareCalculatorHandler";

let ride: Ride;

beforeEach(() => {
  const normalFareCalculator = new NormalFareCalculatorHandler();

  const overnightFareCalculator = new OvernightFareCalculatorHandler(
    normalFareCalculator
  );

  const overnightSundayFareCalculator = new OvernightSundayCalculatorHandler(
    overnightFareCalculator
  );

  const sundayFareSundayFareCalculator = new SundayFareCalculatorHandler(
    overnightSundayFareCalculator
  );

  const specialDayFareCalculator = new SpecialDayFareCalculatorHandler(
    sundayFareSundayFareCalculator
  );

  ride = new Ride(specialDayFareCalculator);
});

test("Deve calcular uma corrida no primeiro dia do mes", () => {
  ride.addSegments(10, new Date("2021-03-01T10:00:00"));
  expect(ride.calculateFare()).toBe(15);
});

test("Deve calcular uma corrida diurna em dias normais", () => {
  ride.addSegments(10, new Date("2021-03-02T10:00:00"));
  expect(ride.calculateFare()).toBe(21);
});

test("Deve calcular uma corrida noturna", () => {
  ride.addSegments(10, new Date("2021-03-04T23:00:00"));
  expect(ride.calculateFare()).toBe(39);
});

test("Deve calcular uma corrida diurna no domingo", () => {
  ride.addSegments(10, new Date("2021-03-07T10:00:00"));
  expect(ride.calculateFare()).toBe(29);
});

test("Deve calcular uma corrida noturna no domingo", () => {
  ride.addSegments(10, new Date("2021-03-07T23:00:00"));
  expect(ride.calculateFare()).toBe(50);
});

test("Deve calcular uma corrida com valor minimo", () => {
  ride.addSegments(3, new Date("2021-03-01T10:00:00"));
  expect(ride.calculateFare()).toBe(10);
});
