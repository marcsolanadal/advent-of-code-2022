const isMarker = (marker) => new Set(marker).size === marker.length;

function findMarker(input, markerLength, pointer = 0) {
  const marker = input.slice(pointer, pointer + markerLength);

  if (isMarker(marker)) {
    return pointer + markerLength;
  }

  return findMarker(input, markerLength, pointer + 1);
}

function solve(markerLength) {
  return (input) => findMarker(input.split(""), markerLength);
}

module.exports = { improvedSolve: solve };
