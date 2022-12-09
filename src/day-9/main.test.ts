import fs from "fs";
import { expandWorld, move, parse } from "./main";

describe("original solution", () => {
  // TODO: Use enum or const object to encode directions
  describe("parse()", () => {
    const input = fs.readFileSync("./sample-input-example", "utf8");

    test("creates the input array correctly", () => {
      expect(parse(input)).toStrictEqual([
        { direction: "R", distance: 4 },
        { direction: "U", distance: 4 },
        { direction: "L", distance: 3 },
        { direction: "D", distance: 1 },
        { direction: "R", distance: 4 },
        { direction: "D", distance: 1 },
        { direction: "L", distance: 5 },
        { direction: "R", distance: 2 },
      ]);
    });
  });

  describe("fillWorld()", () => {
    test("should fill the RIGHT of `head` with zeroes", () => {
      const head = { x: 0, y: 0 };
      const world = [[1]];
      const nextWorld = expandWorld(
        world,
        { direction: "R", distance: 4 },
        head
      );
      expect(nextWorld).toStrictEqual([[1, 0, 0, 0, 0]]);
    });

    test("should fill the LEFT of `head` with zeroes", () => {
      const head = { x: 0, y: 0 };
      const world = [[1]];
      const nextWorld = expandWorld(
        world,
        { direction: "L", distance: 4 },
        head
      );
      expect(nextWorld).toStrictEqual([[0, 0, 0, 0, 1]]);
    });

    test("should fill UP `head` with zeroes", () => {
      const nextWorld = expandWorld(
        [[1, 0, 0]],
        { direction: "U", distance: 4 },
        { x: 0, y: 4 }
      );
      expect(nextWorld).toStrictEqual([
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
        [1, 0, 0],
      ]);
    });

    test("should fill DOWN `head` with zeroes", () => {
      const nextWorld = expandWorld(
        [[1, 0, 0]],
        { direction: "D", distance: 4 },
        { x: 0, y: 0 }
      );
      expect(nextWorld).toStrictEqual([
        [1, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ]);
    });

    test("should append in multiple lines", () => {
      const head = { x: 0, y: 2 };
      const world = [
        [1, 1, 1],
        [2, 2, 2],
        [3, 3, 3],
      ];
      const nextWorld = expandWorld(
        world,
        { direction: "R", distance: 2 },
        head
      );
      expect(nextWorld).toStrictEqual([
        [1, 1, 1, 0, 0],
        [2, 2, 2, 0, 0],
        [3, 3, 3, 0, 0],
      ]);
    });
  });

  describe("move()", () => {
    describe("moves in a streight line", () => {
      test("RIGHT", () => {
        const world = [[1]];
        const instruction = { direction: "R", distance: 4 };
        const head = { x: 0, y: 0 };
        const tail = { x: 0, y: 0 };

        expect(move(world, instruction, head, tail)).toStrictEqual([
          [1, 1, 1, 1, 0],
        ]);
      });
    });

    // describe("is able to turn", () => {
    //   test("RIGHT", () => {
    //     expect(move([[1]], "R", 4)).toStrictEqual([[1, 1, 1, 1, 0]]);
    //   });
    // });

    // describe("only moves head if tail and head are only 1 cell away", () => {
    //   test("RIGHT", () => {
    //     const world = [[0, 1, 0, 0, 0, 0]];
    //     const instruction = { direction: "R", distance: 4 };
    //     const head = { x: 0, y: 0 };
    //     const tail = { x: 1, y: 0 };

    //     expect(move(world, instruction, head, tail)).toStrictEqual([
    //       [0, 1, 1, 1, 0, 0],
    //     ]);
    //   });
    // });

    // describe("grows the array as needed adding one when the tail moves", () => {
    //   test("RIGHT", () => {
    //     expect(move([[1]], "R", 4)).toStrictEqual([[1, 1, 1, 1, 0]]);
    //   });

    //   test("LEFT", () => {
    //     expect(move([[1]], "L", 4)).toStrictEqual([[0, 1, 1, 1]]);
    //   });

    //   test("UP", () => {
    //     expect(move([[1]], "U", 4)).toStrictEqual([[0], [1], [1], [1]]);
    //   });

    //   test("DOWN", () => {
    //     expect(move([[1]], "D", 4)).toStrictEqual([[1], [1], [1], [0]]);
    //   });
    // });
  });
});
