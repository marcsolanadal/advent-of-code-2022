import { open } from 'node:fs/promises';

const priorities = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

async function readPuzzleInput(cb) {
    const file = await open('./puzzle-input.txt');
    let totalScore = 0;
    let elfGroup = [];

    for await (const line of file.readLines()) {
        elfGroup = [...elfGroup, line];

        if (elfGroup.length === 3) {
            totalScore += cb(elfGroup);
            elfGroup = [];
        }
    }

    return totalScore;
}

function getRucksackPriority(elfGroup) {
    let rucksack1 = elfGroup[0].split("");
    let rucksack2 = elfGroup[1].split("");
    let rucksack3 = elfGroup[2].split("");

    const badge = rucksack3.filter(item => {
        return rucksack2.includes(item) && rucksack1.includes(item);
    })[0];

    return priorities.indexOf(badge) + 1;
}

readPuzzleInput(getRucksackPriority).then(solution => {
    console.log(`total score: ${solution}`);
});
