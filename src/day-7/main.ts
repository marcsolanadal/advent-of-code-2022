const fs = require("fs");

function parse(stdout: any): void {
  const commands = stdout
    .split("\n")
    .filter((cmd: string) => !cmd.includes("$ ls"))
    .join("\n")
    .split("$")
    .filter((cmd: string) => cmd !== "")
    .map((cmd: string) => {
      return cmd.trim().split("\n");
    });

  console.log(commands);

  let path: Array<string> = [];
  let tree: any = {};

  for (let command of commands) {
    let [currentDir, ...items] = command;
    currentDir = currentDir.split(" ")[1];

    if (currentDir !== "..") {
      path = [...path, currentDir];
    } else {
      path = path.slice(0, path.length - 1);
    }

    tree = {
      ...tree,
      [path.join(",")]: {
        ...tree[path.join(",")],
        ...items
          .filter((item: string) => !item.includes("dir"))
          .map((item: string) => item.split(" ")[0]),
      },
    };
  }

  return tree;
}

function solve(parsedTree: any, sizeThereshold: number): number {
  let totalSize = 0;
  for (let folder of Object.values(parsedTree)) {
    for (let file of Object.values(folder as Object)) {
      file = Number.parseInt(file, 10);
      if (file > sizeThereshold) {
        console.log(file);
        totalSize += file;
      }
    }
  }

  return totalSize;
}

const stdout = fs.readFileSync("./sample-input-example", "utf-8");
const parsedTree = parse(stdout);
const foo = solve(parsedTree, 100000);

console.log(foo);

module.exports = { parse };
