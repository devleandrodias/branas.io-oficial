import { Segment } from "./Segment";

import { FareCalculatorHandler } from "./fareCalculator/FareCalculatorHandler";

export class Ride {
  private MIN_FARE = 10;

  private segments: Segment[];

  constructor(readonly fareCalculatorHandler: FareCalculatorHandler) {
    this.segments = [];
  }

  addSegments(distance: number, date: Date) {
    this.segments.push(new Segment(distance, date));
  }

  calculateFare() {
    let fare = 0;

    for (const segment of this.segments) {
      fare += this.fareCalculatorHandler.calculate(segment);
    }

    return fare < this.MIN_FARE ? this.MIN_FARE : fare;
  }
}
