import { open } from 'node:fs/promises';

const mappings = {
    "A": "X", // rock
    "B": "Y", // paper
    "C": "Z", // scissors
};

const scores = {
    "X": 1,
    "Y": 2,
    "Z": 3,
};

const moveToWin = {
    "A": "Y",
    "B": "Z",
    "C": "X",
};

/*
    
        +0 lose
        +3 draw
        +6 win
*/
function getMatchScore(input, output) {
    if (mappings[input] === output) return 3;
    if (moveToWin[input] === output) {
        return 6;
    }

    return 0;
}

/*
    shape score:
        +1 rock
        +2 paper
        +3 scissors
*/
function getShapeScore(shape) {
    return scores[shape];
}

async function solve() {
    const file = await open('./puzzle-input.txt');
    let totalScore = 0;

    for await (const line of file.readLines()) {
        const [opponentShape, myShape] = line.split(' ');
        totalScore += scores[myShape] + getMatchScore(opponentShape, myShape);
    }

    return totalScore;
}

solve().then(solution => {
    console.log(`total score: ${solution}`);
});
