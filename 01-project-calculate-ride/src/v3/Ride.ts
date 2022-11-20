import { Segment } from "./Segment";

export class Ride {
  private NORMAL_FARE = 2.1;
  private OVERNIGHT_FARE = 3.9;
  private SUNDAY_FARE = 2.9;
  private OVERNIGHT_SANDAY_FARE = 5;
  private FIRST_DAY_FARE = 1.5;
  private MIN_FARE = 10;

  private segments: Segment[];

  constructor() {
    this.segments = [];
  }

  addSegments(distance: number, date: Date) {
    this.segments.push(new Segment(distance, date));
  }

  calculateFare() {
    let fare = 0;

    for (const segment of this.segments) {
      if (segment.isSpecialDay()) {
        fare += segment.distance * this.FIRST_DAY_FARE;
        continue;
      }

      if (segment.isOvernight() && !segment.isSunday()) {
        fare += segment.distance * this.OVERNIGHT_FARE;
        continue;
      }

      if (segment.isOvernight() && segment.isSunday()) {
        fare += segment.distance * this.OVERNIGHT_SANDAY_FARE;
        continue;
      }

      if (!segment.isOvernight() && segment.isSunday()) {
        fare += segment.distance * this.SUNDAY_FARE;
        continue;
      }

      if (!segment.isOvernight() && !segment.isSunday()) {
        fare += segment.distance * this.NORMAL_FARE;
        continue;
      }
    }

    return fare < this.MIN_FARE ? this.MIN_FARE : fare;
  }
}
