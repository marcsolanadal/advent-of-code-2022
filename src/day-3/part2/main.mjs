import { open } from 'node:fs/promises';

const alphabet = [...Array(26)].map((_, i) => String.fromCharCode(i + 97));
const priorities = [...alphabet, ...alphabet.map(item => item.toUpperCase())];

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

function getCommonItems(rs1, rs2) {
    let commonItems = [];

    rs1.split("").forEach(item => {
        if (rs2.indexOf(item) > 0 && !commonItems.includes(item)) {
            commonItems.push(item);
        }
    })

    return commonItems;
}

const filterRucksacks = (item) => {
    return otherRucksack.forEach(otherItem => {
        if (item === otherItem) {
            return item;
        }
    })
};

function getRucksackPriority(elfGroup) {

    let ci1 = getCommonItems(elfGroup[0], elfGroup[1]);
    let ci2 = getCommonItems(elfGroup[0], elfGroup[2]);
    let ci3 = getCommonItems(elfGroup[1], elfGroup[2]);

    let ci12 = [];
    for (let n = 0; n < ci1.length; n++) {
        for (let m = 0; m < ci2.length; m++) {
            if (ci1[n] === ci2[m]) {
                ci12.push(ci1[n]);
            }
        }
    }

    // finds the unique element between the two arrays of chars
    let badge = "";
    for (let n = 0; n < ci12.length; n++) {
        for (let m = 0; m < ci3.length; m++) {
            if (ci12[n] === ci3[m]) {
                badge = ci12[n];
                break;
            }
        }
    }

    return priorities.indexOf(badge) + 1;
}

readPuzzleInput(getRucksackPriority).then(solution => {
    console.log(`total score: ${solution}`);
});
