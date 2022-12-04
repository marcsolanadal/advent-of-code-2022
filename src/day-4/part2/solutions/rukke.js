const parse = (input) =>
  input
    .split("\n")
    .map((line) => line.split(",").map((r) => r.split("-").map(Number)));

export const part1 = (input) =>
  parse(input)
    .map(([a, b]) => [
      [a, b],
      [Math.min, Math.max].map((f, i) => f(a[i], b[i])),
    ])
    .filter(([pair, range]) =>
      pair.some((p) => p.every((v, i) => v === range[i]))
    ).length;

export const part2 = (input) =>
  parse(input)
    .map(([a, b]) => [
      [a, b],
      [b, a],
    ])
    .filter((arr) =>
      arr.some(([id, [start, end]]) => id.some((v) => v >= start && v <= end))
    ).length;
