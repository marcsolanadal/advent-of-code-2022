import { open } from 'node:fs/promises';

// x: loose, y: draw, z: win
const moveToFollow = {
    "A": {
        "X": "C",
        "Y": "A",
        "Z": "B",
    },
    "B": {
        "X": "A",
        "Y": "B",
        "Z": "C",
    },
    "C": {
        "X": "B",
        "Y": "C",
        "Z": "A",
    },
}

const scores = {
    shapes: {
        "A": 1,
        "B": 2,
        "C": 3,
    },
    suggestions: {
        "X": 0,
        "Y": 3,
        "Z": 6,
    }
}

async function solve() {
    const file = await open('./puzzle-input.txt');
    let totalScore = 0;

    for await (const line of file.readLines()) {
        const [opponentShape, suggestion] = line.split(' ');
        const suggestedShape = moveToFollow[opponentShape][suggestion];

        totalScore += scores.shapes[suggestedShape] + scores.suggestions[suggestion];
    }

    return totalScore;
}

solve().then(solution => {
    console.log(`total score: ${solution}`);
});
