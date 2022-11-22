import { Ride } from "../../src/v3/Ride";

test("Deve calcular uma corrida no primeiro dia do mes", () => {
  const ride = new Ride();
  ride.addSegments(10, new Date("2021-03-01T10:00:00"));
  expect(ride.calculateFare()).toBe(15);
});

test("Deve calcular uma corrida diurna em dias normais", () => {
  const ride = new Ride();
  ride.addSegments(10, new Date("2021-03-02T10:00:00"));
  expect(ride.calculateFare()).toBe(21);
});

test("Deve calcular uma corrida noturna", () => {
  const ride = new Ride();
  ride.addSegments(10, new Date("2021-03-04T23:00:00"));
  expect(ride.calculateFare()).toBe(39);
});

test("Deve calcular uma corrida diurna no domingo", () => {
  const ride = new Ride();
  ride.addSegments(10, new Date("2021-03-07T10:00:00"));
  expect(ride.calculateFare()).toBe(29);
});

test("Deve calcular uma corrida noturna no domingo", () => {
  const ride = new Ride();
  ride.addSegments(10, new Date("2021-03-07T23:00:00"));
  expect(ride.calculateFare()).toBe(50);
});

test("Deve calcular uma corrida com valor minimo", () => {
  const ride = new Ride();
  ride.addSegments(3, new Date("2021-03-01T10:00:00"));
  expect(ride.calculateFare()).toBe(10);
});
