export type Operation = "noop" | "addx";

export interface Instruction {
  op: Operation;
  value: number;
}
