import { Point, Instruction, World, Direction } from "./main.types";

let head: Point = [0, 0];
let tail: Point = [0, 0];

export function parse(input: string): Array<Instruction> {
  return input.split("\n").map((move) => {
    const [direction, distance] = move.split(" ");
    return [direction, Number(distance)] as [Direction, number];
  });
}

function verticalMove(
  world: World,
  distance: number,
  head: Point,
  appendFn: any
) {
  let nextWorld = world;
  const nextHeadY = head[1] + distance;

  if (nextHeadY >= world.length) {
    const toExpand = Array(world[0].length).fill(0);
    for (let n = 0; n < distance; n++) {
      nextWorld = appendFn(nextWorld, toExpand);
    }
  }

  return nextWorld;
}

function horizontalMove(
  world: World,
  distance: number,
  head: Point,
  appendFn: any
) {
  let nextWorld = world;
  const nextHeadX = head[0] + distance;

  if (nextHeadX >= world[0].length) {
    const toExpand = Array(nextHeadX - world[0].length + 1).fill(0);
    nextWorld = world.map((row) => appendFn(row, toExpand));
  }

  return nextWorld;
}

function appendRight(world: World, appendArr: number[]) {
  console.log(appendArr);
  return [...world, appendArr];
}

export function move(
  world: World,
  instruction: Instruction,
  head: Point,
  tail: Point
): World {
  let nextWorld = world;
  const [direction, distance] = instruction;

  if (direction === "R") {
    nextWorld = horizontalMove(world, distance, head, appendRight);
  }

  if (direction === "L") {
    nextWorld = horizontalMove(
      world,
      distance,
      head,
      (nextWorld: any, toExpand: any) => [toExpand, ...nextWorld]
    );
  }

  if (direction === "U") {
    nextWorld = verticalMove(
      world,
      distance,
      head,
      (nextWorld: any, toExpand: any) => [toExpand, ...nextWorld]
    );
  }

  if (direction === "D") {
    nextWorld = verticalMove(
      world,
      distance,
      head,
      (nextWorld: any, toExpand: any) => [...nextWorld, toExpand]
    );
  }

  return nextWorld;
}
