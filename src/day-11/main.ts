type OperationFn = (a: number) => number;

export function operation(str: string): OperationFn {
  const oStr = str.split(" ");

  if (oStr[4] === "+") {
    if (oStr[5] === "old") {
      return (old) => old + old;
    } else {
      return (old) => old + Number(oStr[5]);
    }
  }

  if (oStr[4] === "*") {
    if (oStr[5] === "old") {
      return (old) => old * old;
    } else {
      return (old) => old * Number(oStr[5]);
    }
  }

  if (oStr[4] === "-") {
    if (oStr[5] === "old") {
      return (old) => old - old;
    } else {
      return (old) => old - Number(oStr[5]);
    }
  }

  return (old) => old;
}
