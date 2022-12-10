import fs from "fs";

import { parse, drawToCRT } from "./main";

describe("original solution", () => {
  describe("parse()", () => {
    test("creates the input array correctly", () => {
      const rawInput = "noop\naddx 3\naddx -5";
      expect(parse(rawInput)).toStrictEqual([
        { op: "noop" },
        { op: "addx", value: 3 },
        { op: "addx", value: -5 },
      ]);
    });
  });

  describe("drawToCRT()", () => {
    test("creates the input array correctly", () => {
      const cycles = [1, 1, 1, 1, 1, 1];
      expect(drawToCRT(cycles)[0]).toEqual("###...");
    });
  });

  describe("run()", () => {
    // test("should create a cycle array", () => {
    //   expect(generateCycles(5)).toEqual([0, 1, 2, 3, 4]);
    // });
    // test("should move the ", () => {
    //   const cycles = [1, 2];
    //   const instructions = [{ op: "noop" }, { op: "noop" }];
    //   const cyclePointer = 0;
    //   run(cycles, instructions);
    //   expect(cyclePointer).toEqual(1);
    // });
    // describe("noop", () => {
    //   test("should skip a cycle", () => {
    //     const cycles = [1, 2];
    //     const currentCycle = 0;
    //     const x = 1;
    //     exec({ op: "noop" }, x);
    //     expect(currentCycle).toBe(1);
    //     expect(x).toBe(1);
    //   });
    // });
  });

  describe("findSignalStrength()", () => {});
});
