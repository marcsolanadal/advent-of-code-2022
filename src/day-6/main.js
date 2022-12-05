const fs = require("fs");

function parse() {
  const data = fs.readFileSync("./sample-input", "utf-8");

  return data;
}

function main() {
  const output = parse();

  console.log(output);
}

// main();

module.exports = { main };
