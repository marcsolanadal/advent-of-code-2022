import fs from "fs";
import { parse, solve, isOrthogonallyVisible } from "./main";

describe("original solution", () => {
  describe("parse()", () => {
    test("creates the input array correctly", () => {
      const input = "111\n222\n333";
      expect(parse(input)).toStrictEqual([
        [1, 1, 1],
        [2, 2, 2],
        [3, 3, 3],
      ]);
    });
  });

  describe("isOrthogonallyVisible()", () => {
    test("is visible when all trees are shorter", () => {
      const parsedInput = [
        [1, 1, 1],
        [1, 2, 1],
        [1, 1, 1],
      ];
      expect(isOrthogonallyVisible(1, 1, parsedInput)).toBe(true);
    });

    test("is visible with multiple lower trees", () => {
      const parsedInput = [
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 1, 2, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
      ];
      expect(isOrthogonallyVisible(2, 2, parsedInput)).toBe(true);
    });

    test("is not visible with multiple lower trees", () => {
      let parsedInput = [
        [1, 1, 1, 1, 1],
        [1, 1, 3, 1, 1],
        [1, 3, 2, 3, 1],
        [1, 1, 3, 1, 1],
        [1, 1, 1, 1, 1],
      ];
      expect(isOrthogonallyVisible(2, 2, parsedInput)).toBe(false);

      parsedInput = [
        [1, 1, 3, 1, 1],
        [1, 1, 1, 1, 1],
        [3, 1, 2, 1, 3],
        [1, 1, 1, 1, 1],
        [1, 1, 3, 1, 1],
      ];
      expect(isOrthogonallyVisible(2, 2, parsedInput)).toBe(false);
    });

    describe("is visible even with one direction", () => {
      test("north", () => {
        expect(
          isOrthogonallyVisible(1, 1, [
            [1, 1, 1],
            [3, 2, 3],
            [1, 3, 1],
          ])
        ).toBe(true);
      });
      test("south", () => {
        expect(
          isOrthogonallyVisible(1, 1, [
            [1, 3, 1],
            [3, 2, 3],
            [1, 1, 1],
          ])
        ).toBe(true);
      });
      test("west", () => {
        expect(
          isOrthogonallyVisible(1, 1, [
            [1, 3, 1],
            [1, 2, 3],
            [1, 3, 1],
          ])
        ).toBe(true);
      });
      test("east", () => {
        expect(
          isOrthogonallyVisible(1, 1, [
            [1, 3, 1],
            [3, 2, 1],
            [1, 3, 1],
          ])
        ).toBe(true);
      });
    });

    test("is not visible when all trees are equal or taller", () => {
      const parsedInput = [
        [1, 2, 1],
        [2, 2, 2],
        [1, 2, 1],
      ];
      expect(isOrthogonallyVisible(1, 1, parsedInput)).toBe(false);
    });
  });

  describe("part 1", () => {
    test("with example input", () => {
      const input = `30373\n25512\n65332\n33549\n35390`;
      expect(solve(parse(input))).toBe(21);
    });

    test("with real input", () => {
      const input = fs.readFileSync("./sample-input", "utf8");
      expect(solve(parse(input))).toBe(21);
    });
  });
});
