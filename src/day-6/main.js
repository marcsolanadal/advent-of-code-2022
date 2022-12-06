const fs = require("fs");

function solve(windowWidth) {
  return (signal) => transposeSignalWindow(signal, windowWidth);
}

function transposeSignalWindow(signal, windowWidth, index = 0) {
  if (index === signal.length - windowWidth + 1) {
    return 0;
  }

  let signalWindow = [];
  for (let i = 0; i < windowWidth; i++) {
    signalWindow = [...signalWindow, signal[index + i]];
  }

  if (checkRepeatedChar(signalWindow) === true) {
    return transposeSignalWindow(signal, windowWidth, index + 1);
  }

  return index + windowWidth;
}

function checkRepeatedChar(arr) {
  let repeated = false;
  for (let n = 0; n < arr.length; n++) {
    for (let m = 0; m < arr.length; m++) {
      if (arr[n] === arr[m] && m !== n) {
        repeated = true;
        break;
      }
    }
  }
  return repeated;
}

function main() {
  const signal = fs.readFileSync("./sample-input", "utf-8").split("");

  const part1 = solve(4);
  const part2 = solve(12);

  console.log(`part1 solution: ${part1(signal)}`);
  console.log(`part2 solution: ${part2(signal)}`);
}

module.exports = { originalSolve: solve, checkRepeatedChar };
