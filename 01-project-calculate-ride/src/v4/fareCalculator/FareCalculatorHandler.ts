import { Segment } from "../Segment";

export interface FareCalculatorHandler {
  next?: FareCalculatorHandler;
  calculate(segment: Segment): number;
}
