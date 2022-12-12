import fs from "fs";
import path from "path";

import { operation } from "./main";

describe("original solution", () => {
  describe("parse()", () => {
    const input = fs.readFileSync(
      path.join(__filename, "../test-input-1"),
      "utf8"
    );

    test.only("parses operation line", () => {
      let opFn = operation("Operation: new = old * 19");
      expect(opFn(10)).toBe(190);

      opFn = operation("Operation: new = old + 19");
      expect(opFn(10)).toBe(29);

      opFn = operation("Operation: new = old - 5");
      expect(opFn(10)).toBe(5);
    });

    // test("parses a single monkey correctly", () => {

    //   interface Monkey {
    //     count: number;
    //     items: Array<number>;
    //     operation: (old: number) => number;
    //     test: number;
    //     receivers: Array<number>;
    //     turn: (void) => void;
    //   }

    //   expect(parse(input)).toStrictEqual({
    //     count: 0,
    //     items: [79, 98],
    //     operation: (old:number) => old * 19,
    //     test: 23,
    //     receivers: [2, 3],
    //   });
    // });
  });
});
