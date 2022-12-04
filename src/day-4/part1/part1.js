function solve(elfPair) {
  const [elf1, elf2] = elfPair.split(",");
  let [min1, max1] = elf1.split("-");
  let [min2, max2] = elf2.split("-");

  min1 = Number.parseInt(min1, 10);
  max1 = Number.parseInt(max1, 10);
  min2 = Number.parseInt(min2, 10);
  max2 = Number.parseInt(max2, 10);

  let fullOverlap = false;
  if ((min1 <= min2 && max1 >= max2) || (min1 >= min2 && max1 <= max2)) {
    fullOverlap = true;
  }

  //   console.log(`
  //         elf1: ${elf1}
  //             min: ${min1}
  //             max: ${max1}
  //         elf2: ${elf2}
  //             min: ${min2}
  //             max: ${max2}
  //         fullOverlap: ${fullOverlap}
  //         min1 <= min2: ${min1 <= min2}
  //         max1 >= max2: ${max1 >= max2}
  //     `);

  return fullOverlap;
}

module.exports = {
  solve,
};
