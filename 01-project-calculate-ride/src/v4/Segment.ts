export class Segment {
  private SPECIAL_DAY = 1;
  private OVERNIGHT_START = 22;
  private OVERNIGHT_END = 6;

  constructor(readonly distance: number, readonly date: Date) {
    if (!this.isValidDistance()) {
      throw new Error("Invalid Distance");
    }

    if (!this.isValidDate()) {
      throw new Error("Invalid Date");
    }
  }

  isValidDistance() {
    return (
      this.distance != null &&
      this.distance != undefined &&
      typeof this.distance === "number" &&
      this.distance > 0
    );
  }

  isValidDate() {
    return (
      this.date != null &&
      this.date != undefined &&
      this.date instanceof Date &&
      this.date.toString() !== "Invalid Date"
    );
  }

  isOvernight() {
    return (
      this.date.getHours() >= this.OVERNIGHT_START ||
      this.date.getHours() <= this.OVERNIGHT_END
    );
  }

  isSpecialDay() {
    return this.date.getDate() === this.SPECIAL_DAY;
  }

  isSunday() {
    return this.date.getDay() === 0;
  }
}
