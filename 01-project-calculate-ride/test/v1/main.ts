import { calc } from "../../src/v1/main";

console.log(calc([{ dist: 10, ds: new Date("2021-03-01T10:00:00") }]));
console.log(calc([{ dist: 10, ds: new Date("2021-03-01T23:00:00") }]));
console.log(calc([{ dist: 10, ds: new Date("2021-03-07T10:00:00") }]));
console.log(calc([{ dist: 10, ds: new Date("2021-03-07T23:00:00") }]));
console.log(calc([{ dist: -10, ds: new Date("2021-03-01T10:00:00") }]));
console.log(calc([{ dist: 10, ds: new Date("abcdef") }]));
console.log(calc([{ dist: 3, ds: new Date("2021-03-01T10:00:00") }]));
