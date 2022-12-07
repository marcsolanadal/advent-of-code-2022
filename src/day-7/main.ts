const fs = require("fs");

interface Directory {
  readonly name: string;
  contents: Array<Directory | File>;
  size?: number;
}

interface File {
  readonly name: string;
  readonly size: number;
}

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

const stdout = parse(fs.readFileSync("./sample-input-example", "utf-8"));
console.log(stdout);

module.exports = { parse };
