const MARKER_LENGTH = 4;

const isMarker = (marker) => new Set(marker).size === marker.length;

const solve = (input) => {
  let marker = input.slice(0, MARKER_LENGTH);
  let aux = 1;

  while (!isMarker(marker)) {
    marker = input.slice(aux, aux + MARKER_LENGTH);
    aux += 1;
  }

  return aux + MARKER_LENGTH - 1;
};
