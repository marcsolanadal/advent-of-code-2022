interface Instruction {
  direction: string;
  distance: number;
}

interface Position {
  x: number;
  y: number;
}

let head: Position = { x: 0, y: 0 };
let tail: Position = { x: 0, y: 0 };

export function parse(input: string): Array<Instruction> {
  return input.split("\n").map((move) => {
    const [direction, value] = move.split(" ");
    return {
      direction,
      distance: Number.parseInt(value, 10),
    };
  });
}

export function expandWorld(
  world: number[][],
  instruction: Instruction,
  head: Position
): number[][] {
  let nextWorld = world;
  switch (instruction.direction) {
    case "R":
      const appendRight = Array(instruction.distance).fill(0);
      nextWorld = world.map((row) => {
        return [...row, ...appendRight] as number[];
      });
      break;

    case "L":
      const appendLeft = Array(instruction.distance).fill(0);
      nextWorld = world.map((row) => {
        return [...appendLeft, ...row] as number[];
      });
      break;

    case "U":
      const appendUp = Array(world[0].length).fill(0);
      for (let n = 0; n < instruction.distance; n++) {
        nextWorld = [appendUp, ...nextWorld];
      }
      break;

    case "D":
      const appendDown = Array(world[0].length).fill(0);
      for (let n = 0; n < instruction.distance; n++) {
        nextWorld = [...nextWorld, appendDown];
      }
      break;

    default:
      console.error("direction does not exist");
      break;
  }

  return nextWorld;
}

export function move(
  world: number[][] = [[1]],
  instruction: Instruction,
  head: Position,
  tail: Position
): number[][] {
  expandWorld(world, instruction, head);

  if (instruction.direction === "R") {
    // moves head to position
    head.x += instruction.distance;

    console.log(`world init: ${world}`);

    // tail follows
    for (let n = 0; n < instruction.distance; n++) {
      if (Math.abs(head.x - tail.x) >= 1) {
        world[tail.y][n] = 1;
        // world[tail.x] = [...world[tail.x], 1];

        tail.x += 1;
        continue;
      }
    }

    console.log(`world: ${world}`);
  }

  // for (let n = 0; n < instruction.distance; n++) {
  //   if (Math.abs(head.x - tail.x) > 1) {
  //     // last value added to the line
  //     // const valueToAdd = n === instruction.distance - 1 ? 0 : 1;

  //     // world[head.x].push(1);
  //     world[head.x] = [...world[head.x], 1];
  //     tail.x += 1;
  //     continue;
  //   }

  //   console.log(world[head.x]);

  //   // world[head.x].push(0);
  //   world[head.x] = [...world[head.x], 0];
  //   head.x = n;
  // }

  // switch (direction) {
  //   case "R":

  //     break;
  //   default:
  //     throw Error(`Direction ${direction} does not exist`);
  // }

  return world;
}
