import fs from "fs";
import path from "path";

import { Instruction } from "./main.types";

export function parse(rawInput: string): Array<Instruction> {
  return rawInput.split("\n").map((operation) => {
    const [op, value] = operation.split(" ");

    if (value === undefined) {
      return { op } as Instruction;
    }

    return {
      op,
      value: Number(value),
    } as Instruction;
  });
}

export function calculateSignalStrength(cycles: number[]) {
  return [20, 60, 100, 140, 180, 220].reduce(
    (signalStrength: number, value: number): number => {
      signalStrength += cycles[value] * value;
      return signalStrength;
    },
    0
  );
}

export function drawToCRT(cycles: number[]) {
  const crt = [
    cycles.slice(0, 39),
    cycles.slice(40, 79),
    cycles.slice(80, 119),
    cycles.slice(120, 159),
    cycles.slice(160, 199),
    cycles.slice(200, 239),
  ];

  return crt.map((line) => {
    return line
      .map((x, index) => {
        return index + 1 >= x && index + 1 <= x + 2 ? "#" : ".";
      })
      .join("");
  });
}

function exec(instruction: Instruction, x: number): any {
  switch (instruction.op) {
    case "noop":
      return { opCycle: [x], updateX: (x: number) => x };
    case "addx":
      return { opCycle: [x, x], updateX: (x: number, v: number) => x + v };
    default:
      console.error("instruction OP code does not exist");
  }
}

export function run(instructions: Array<Instruction>): number {
  let x = 1;
  let cycles: number[] = []; // We need to add 1 here for part 2

  for (const instruction of instructions) {
    const { opCycle, updateX } = exec(instruction, x);
    cycles = [...cycles, ...opCycle];

    x = updateX(x, instruction.value);
  }

  const crt = drawToCRT(cycles);
  console.log(crt);

  return calculateSignalStrength(cycles);
}

const rawInput = fs.readFileSync(
  path.join(__filename, "../sample-input"),
  "utf8"
);

const solution = run(parse(rawInput));
console.log(`solution ${solution}`);
