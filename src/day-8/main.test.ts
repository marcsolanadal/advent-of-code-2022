import fs from "fs";
import { parse, solve } from "./main";

describe("original solution", () => {
  describe("parse()", () => {
    test("", () => {
      const input = "111\n222\n333";
      expect(parse(input)).toStrictEqual([
        [1, 1, 1],
        [2, 2, 2],
        [3, 3, 3],
      ]);
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
