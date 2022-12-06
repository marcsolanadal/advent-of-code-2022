const { originalSolve, checkRepeatedChar } = require("./main.js");
const { improvedSolve } = require("./main.improved.js");

describe("original solution", () => {
  describe("checkRepeatedChar()", () => {
    test("Correctly identifies array with repeated items", () => {
      expect(checkRepeatedChar(["a", "b", "c"])).toBe(false);
      expect(checkRepeatedChar(["a", "b", "b"])).toBe(true);
      expect(checkRepeatedChar(["a", "a", "a"])).toBe(true);
    });
  });

  describe("part 1", () => {
    const part1 = originalSolve(4);

    test("it gets the correct solution", () => {
      expect(part1(`bvwbjplbgvbhsrlpgdmjqwftvncz`)).toBe(5);
      expect(part1(`nppdvjthqldpwncqszvftbrmjlhg`)).toBe(6);
      expect(part1(`nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg`)).toBe(10);
      expect(part1(`zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw`)).toBe(11);
    });
  });

  describe("part 2", () => {
    const part2 = originalSolve(14);

    test("it gets the correct solution", () => {
      expect(part2(`mjqjpqmgbljsphdztnvjfqwrcgsmlb`)).toBe(19);
      expect(part2(`bvwbjplbgvbhsrlpgdmjqwftvncz`)).toBe(23);
      expect(part2(`nppdvjthqldpwncqszvftbrmjlhg`)).toBe(23);
      expect(part2(`nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg`)).toBe(29);
      expect(part2(`zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw`)).toBe(26);
    });
  });
});

describe("Improved solution using Set", () => {
  describe("part 1", () => {
    const part1 = improvedSolve(4);

    test("it gets the correct solution", () => {
      expect(part1(`bvwbjplbgvbhsrlpgdmjqwftvncz`)).toBe(5);
      expect(part1(`nppdvjthqldpwncqszvftbrmjlhg`)).toBe(6);
      expect(part1(`nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg`)).toBe(10);
      expect(part1(`zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw`)).toBe(11);
    });
  });

  describe("part 2", () => {
    const part2 = improvedSolve(14);

    test("it gets the correct solution", () => {
      expect(part2(`mjqjpqmgbljsphdztnvjfqwrcgsmlb`)).toBe(19);
      expect(part2(`bvwbjplbgvbhsrlpgdmjqwftvncz`)).toBe(23);
      expect(part2(`nppdvjthqldpwncqszvftbrmjlhg`)).toBe(23);
      expect(part2(`nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg`)).toBe(29);
      expect(part2(`zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw`)).toBe(26);
    });
  });
});
