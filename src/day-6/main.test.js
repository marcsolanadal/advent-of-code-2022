const { signalDetectionFactory, checkRepeatedChar } = require("./main.js");

describe("checkRepeatedChar()", () => {
  test("Correctly identifies array with repeated items", () => {
    expect(checkRepeatedChar(["a", "b", "c"])).toBe(false);
    expect(checkRepeatedChar(["a", "b", "b"])).toBe(true);
    expect(checkRepeatedChar(["a", "a", "a"])).toBe(true);
  });
});

describe("part 1", () => {
  const part1 = signalDetectionFactory(4);

  test("it gets the correct solution", () => {
    expect(part1(`bvwbjplbgvbhsrlpgdmjqwftvncz`)).toBe(5);
    expect(part1(`nppdvjthqldpwncqszvftbrmjlhg`)).toBe(6);
    expect(part1(`nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg`)).toBe(10);
    expect(part1(`zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw`)).toBe(11);
  });
});

describe("part 2", () => {
  const part2 = signalDetectionFactory(14);

  test("it gets the correct solution", () => {
    expect(part2(`mjqjpqmgbljsphdztnvjfqwrcgsmlb`)).toBe(19);
    expect(part2(`bvwbjplbgvbhsrlpgdmjqwftvncz`)).toBe(23);
    expect(part2(`nppdvjthqldpwncqszvftbrmjlhg`)).toBe(23);
    expect(part2(`nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg`)).toBe(29);
    expect(part2(`zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw`)).toBe(26);
  });
});
