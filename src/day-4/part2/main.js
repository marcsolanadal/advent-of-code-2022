const { open } = require("node:fs/promises");

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

// readPuzzleInput(solve).then((solution) => {
//   console.log(`total score: ${solution}`);
// });

function parse(elfPairString) {
  const ranges = elfPairString
    .split(",")
    .map((range) => range.split("-").map((num) => Number(num)));

  const [[a, b], [x, y]] = ranges;
  const range1 = [...Array(b - a + 1).keys()].map((n) => n + a);
  const range2 = [...Array(y - x + 1).keys()].map((n) => n + x);

  return [range1, range2];
}

function checkArrayOverlapping(arr1, arr2) {
  for (let i = 0; i < arr1.length; i++) {
    if (arr2.includes(arr1[i])) {
      return true;
    }
  }

  return false;
}

function solve(elfPair) {
  const [range1, range2] = parse(elfPair);
  return checkArrayOverlapping(range1, range2);
}

exports.parse = parse;
