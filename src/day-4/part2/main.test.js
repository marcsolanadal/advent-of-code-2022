const { parse } = require("./main.js");

test("parses the elf task string to a range array", () => {
  expect(parse("1-3,4-6")).toEqual([
    [1, 2, 3],
    [4, 5, 6],
  ]);
});
