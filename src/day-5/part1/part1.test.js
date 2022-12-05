const { getLineStackValues, initStacks, move } = require("./part1.js");

describe("parse stack state", () => {
  test("generates the correct number of stacks based on str length", () => {
    let input = "    [D]    ";
    expect(initStacks(input)).toEqual([[], [], []]);

    input = "[Z] [M] [P] [Z] [M] [P]";
    expect(initStacks(input)).toEqual([[], [], [], [], [], []]);
  });

  test("read a line and add it into the correct stack", () => {
    let stacks = [[], [], []];
    let input = "    [D]    ";

    expect(getLineStackValues(input, stacks)).toStrictEqual([[], ["D"], []]);

    input = "[N] [C]    ";
    expect(getLineStackValues(input, stacks)).toStrictEqual([
      ["N"],
      ["D", "C"],
      [],
    ]);

    input = "[Z] [M] [P]";
    expect(getLineStackValues(input, stacks)).toStrictEqual([
      ["N", "Z"],
      ["D", "C", "M"],
      ["P"],
    ]);
  });
});

describe("crane instructions", () => {
  const instructions =
    "move 1 from 2 to 1\nmove 3 from 1 to 3\nmove 2 from 2 to 1\nmove 1 from 1 to 2";

  test("move the correct number of items to the designated stacks", () => {
    let stacks = [["N", "Z"], ["D", "C", "M"], ["P"]];
    const input = "move 1 from 2 to 1";

    expect(move(input, stacks)).toStrictEqual([
      ["N", "Z", "M"],
      ["D", "C"],
      ["P"],
    ]);
  });
});
