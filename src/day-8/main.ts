export function parse(input: string): Array<Array<number>> {
  return input
    .split("\n")
    .map((row: string) => row.split("").map((str) => Number.parseInt(str, 10)));
}

export function solve(forest: Array<Array<number>>): number {
  let visibleTreeCount: number = 2 * forest.length + 2 * forest[0].length - 4;
  for (let x = 1; x < forest.length - 1; x++) {
    for (let y = 1; y < forest[0].length - 1; y++) {
      if (isOrthogonallyVisible(x, y, forest)) {
        visibleTreeCount += 1;
      }
    }
  }
  return visibleTreeCount;
}

export function isOrthogonallyVisible(
  x: number,
  y: number,
  forest: Array<Array<number>>
): boolean {
  let visibility = {
    north: true,
    south: true,
    west: true,
    east: true,
  };

  // West
  for (let n = 0; n < x; n++) {
    if (forest[x][n] >= forest[x][y]) {
      visibility.west = false;
    }
  }

  // East
  for (let n = x + 1; n < forest.length; n++) {
    if (forest[x][n] >= forest[x][y]) {
      visibility.east = false;
    }
  }

  // North
  for (let n = 0; n < y; n++) {
    if (forest[n][y] >= forest[x][y]) {
      visibility.north = false;
    }
  }

  // South
  for (let n = y + 1; n < forest[0].length; n++) {
    if (forest[n][y] >= forest[x][y]) {
      visibility.south = false;
    }
  }

  return Object.values(visibility).reduce((value: boolean, acc: boolean) => {
    acc = acc || value;
    return acc;
  }, false);
}
