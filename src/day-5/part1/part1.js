const { open } = require("node:fs/promises");

async function readPuzzleInput() {
  const file = await open("./puzzle-input.txt");
  let initialized = false;
  let parsed = false;
  let stacks = [];

  // TODO: This is too imperative stlye for my taste
  for await (const line of file.readLines()) {
    if (!initialized) {
      stacks = initStacks(line);
      initialized = true;
    }

    // Waits for the index line so we know the crates definition is over
    if (line[1] === "1") {
      stacks = stacks.map((stack) => stack.reverse());
      parsed = true;
      console.log(stacks);
    }

    if (!parsed) {
      // We read every line and put the values inside the corresponding stack array
      stacks = getLineStackValues(line, stacks);
    } else {
      //
      if (line[0] === "m") {
        stacks = move(line, stacks);
        console.log(stacks);
      }
    }
  }

  return getSolution(stacks);
}

// 1 5 9 13 17 21
function initStacks(line) {
  const stackNum = Math.floor(line.length / 4) + 1;
  let stacks = [];

  for (let n = 0; n < stackNum; n++) {
    stacks.push([]);
  }

  return stacks;
}

function getLineStackValues(line, stacks) {
  for (let n = 1, i = 0; n < line.length; n += 4, i++) {
    if (line[n] !== " ") {
      stacks[i].push(line[n]);
    }
  }

  return stacks;
}

//  "move 1 from 2 to 1";
function move(moveStr, stacks) {
  let nextStacks = stacks;
  const instructions = moveStr.split(" ");
  const itemsToMove = Number.parseInt(instructions[1], 10);
  const fromStack = Number.parseInt(instructions[3], 10) - 1;
  const toStack = Number.parseInt(instructions[5], 10) - 1;

  // Remove item from stack and add it to the destination stack
  const items = nextStacks[fromStack].splice(
    nextStacks[fromStack].length - itemsToMove,
    itemsToMove
  );
  nextStacks[toStack] = [...nextStacks[toStack], ...items.reverse()];

  return nextStacks;
}

function getSolution(stacks) {
  return stacks.map((stack) => stack[stack.length - 1]).join("");
}

readPuzzleInput().then((solution) => {
  console.log(`solution: ${solution}`);
});

module.exports = {
  initStacks,
  getLineStackValues,
  move,
  getSolution,
};
