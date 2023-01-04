export class OrderCode {
  private value: string;

  constructor(date: Date, sequence: number) {
    if (sequence < 0) {
      throw new Error("Invalid sequence");
    }

    const year = date.getFullYear();
    this.value = `${year}${new String(sequence).padStart(8, "0")}`;
  }

  getValue() {
    return this.value;
  }
}
