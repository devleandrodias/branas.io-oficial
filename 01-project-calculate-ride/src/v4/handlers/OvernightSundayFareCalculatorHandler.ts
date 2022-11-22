import { Segment } from "../Segment";
import { FareCalculatorHandler } from "../fareCalculator/FareCalculatorHandler";

export class OvernightSundayCalculatorHandler implements FareCalculatorHandler {
  private FARE = 5;

  readonly next?: FareCalculatorHandler;

  constructor(next?: FareCalculatorHandler) {
    this.next = next;
  }

  calculate(segment: Segment): number {
    if (segment.isOvernight() && segment.isSunday()) {
      return segment.distance * this.FARE;
    }

    if (!this.next) throw new Error();

    return this.next?.calculate(segment);
  }
}
