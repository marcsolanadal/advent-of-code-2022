import { open } from 'node:fs/promises';


async function readPuzzleInput(cb) {
    const file = await open('./puzzle-input.txt');
    let overlapCount = 0;

    for await (const line of file.readLines()) {
        const overlaps = cb(line);
        if (overlaps) {
            overlapCount += 1;
        }
    }

    return overlapCount;
}

function checkOverlappingTasks(elfPair) {
    const [elf1, elf2] = elfPair.split(",");
    let [a, b] = elf1.split("-");
    let [x, y] = elf2.split("-");

    a = Number.parseInt(a, 10);
    b = Number.parseInt(b, 10);
    x = Number.parseInt(x, 10);
    y = Number.parseInt(y, 10);

    const range1 = [...Array(b - a + 1).keys()].map(n => n + a);
    const range2 = [...Array(y - x + 1).keys()].map(n => n + x);

    // Find overlap between ranges
    let overlaps = false;
    for (let i = 0; i < range1.length; i++) {
        if (range2.includes(range1[i])) {
            overlaps = true;
            break;
        }
    }

    return overlaps;
}

readPuzzleInput(checkOverlappingTasks).then(solution => {
    console.log(`total score: ${solution}`);
});
