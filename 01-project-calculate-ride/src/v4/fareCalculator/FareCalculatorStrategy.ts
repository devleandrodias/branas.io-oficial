import { Segment } from "../Segment";

export interface FareCalculatorStrategy {
  calculate(segment: Segment): number;
}
