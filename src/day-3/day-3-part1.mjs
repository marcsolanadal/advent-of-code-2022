import { open } from 'node:fs/promises';

// Lowercase item types a through z have priorities 1 through 26.
// Uppercase item types A through Z have priorities 27 through 52.
const alphabet = [...Array(26)].map((_, i) => String.fromCharCode(i + 97));
const priorities = [...alphabet, ...alphabet.map(item => item.toUpperCase())];

console.log(`priorities: ${priorities}`);

async function readPuzzleInput(cb) {
    const file = await open('./puzzle-input.txt');
    let totalScore = 0;

    for await (const line of file.readLines()) {
        totalScore += cb(line);
    }

    return totalScore;
}

function getRucksackPriority(rucksackString) {
    const middleIndex = rucksackString.length / 2;
    const c1 = rucksackString.substring(0, middleIndex);
    const c2 = rucksackString.substring(middleIndex, rucksackString.length);

    // Get the missplaced item from one of the compartments
    let missplacedItem = "";
    for (let j = 0; j < c1.length; j++) {
        for (let k = 0; k < c2.length; k++) {
            if (c1[j] === c2[k]) {
                missplacedItem = c1[j];
                break;
            }
        }
    }

    // I need to add one to the priorities since the indexOf function counts from zero.
    const itemPriority = priorities.indexOf(missplacedItem) + 1;

    // console.log(`
    //     rucksack: ${rucksackString}
    //     c1: ${c1}
    //     c2: ${c2}
    //     missplacedItem: ${missplacedItem}
    //     priority: ${itemPriority}
    // `)

    return itemPriority;
}

readPuzzleInput(getRucksackPriority).then(solution => {
    console.log(`total score: ${solution}`);
});
