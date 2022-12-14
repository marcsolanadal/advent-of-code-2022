const { open } = require("node:fs/promises");
const { solve } = require("./part1/part1");

async function readPuzzleInput(cb) {
  const file = await open("./puzzle-input.txt");
  let overlapCount = 0;

  for await (const line of file.readLines()) {
    const overlaps = cb(line);
    if (overlaps) {
      overlapCount += 1;
    }
  }

  return overlapCount;
}

readPuzzleInput(solve).then((solution) => {
  console.log(`total score: ${solution}`);
});
