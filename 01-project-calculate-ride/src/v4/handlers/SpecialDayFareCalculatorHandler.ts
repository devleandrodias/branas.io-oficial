import { Segment } from "../Segment";
import { FareCalculatorHandler } from "../fareCalculator/FareCalculatorHandler";

export class SpecialDayFareCalculatorHandler implements FareCalculatorHandler {
  private FARE = 1.5;

  readonly next?: FareCalculatorHandler;

  constructor(next?: FareCalculatorHandler) {
    this.next = next;
  }

  calculate(segment: Segment): number {
    if (segment.isSpecialDay()) {
      return segment.distance * this.FARE;
    }

    if (!this.next) throw new Error();

    return this.next?.calculate(segment);
  }
}
