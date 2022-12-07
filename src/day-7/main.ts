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

function changeDirectory(
  path: Array<Directory>,
  args: string
): Array<Directory> {
  return args === ".."
    ? path.slice(0, path.length - 1)
    : [...path, { name: args, contents: [] }];
}

/*
{
  name: "/",
  type: "dir",
  size: 0,
  contents: [
    { name: "a", type: "dir", size: 0, contents: [
      ...
    ]},
    { name: "b.txt", type: "file", size: 14848514},
    { name: "c.dat", type: "file", size: 8504156},
    { name: "d", type: "dir", size: 0, contents: [
      ...
    ]},
  ]
}
*/

// const commandToFilesystem = (
//   commands: any,
//   path: Array<string> = [],
//   tree: any = {}
// ): any => {
//   // if (commands.length === 0) return tree;

//   for (command of commands) {
//     let [currentDir, ...items] = command;
//     currentDir = currentDir.split(" ")[1];

//     if (currentDir !== "..") {
//       path = [...path, currentDir];
//     } else {
//       path = path.slice(0, path.length - 1);
//     }

//     console.log(`current path: ${path}, ${items}`);

//     const test = items
//       .filter((item: string) => !item.includes("dir"))
//       .map((item: string) => item.split(" ")[0]);

//     console.log(`items: ${test}`);

//     const nextTree = {
//       ...tree,
//       [path.join(",")]: test,
//     };
//   }

//   // let directory: Directory = {
//   //   name: currentDir,
//   //   contents: [],
//   // };

//   // for (let dir in path) {
//   //   // dinamically create object
//   // }

//   // return commandToFilesystem(commands.slice(1), path, nextTree);

//   // for (let item of items) {
//   //   const [arg, name] = item.split(" ");
//   //   if (arg === "dir") {
//   //     directory.contents.push(commandToFilesystem(nextCommands, path, tree));
//   //   } else {
//   //     directory.contents.push({
//   //       name,
//   //       size: Number.parseInt(arg, 10),
//   //     } as File);
//   //   }
//   // }

//   // return directory;
// };

function parse(stdout: any): void {
  const commands = stdout
    .split("\n")
    .filter((cmd: string) => !cmd.includes("$ ls"))
    .filter((cmd: string) => !cmd.includes("cd .."))
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
      [path.join(",")]: items
        .filter((item: string) => !item.includes("dir"))
        .map((item: string) => item.split(" ")[0]),
    };
  }

  return tree;
}

const stdout = parse(fs.readFileSync("./sample-input-example", "utf-8"));
console.log(stdout);

module.exports = { parse, changeDirectory };
