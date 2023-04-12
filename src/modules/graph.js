import Node from './node';

function addLegalMoves(board, val) {
  const legalMoves = [[2, -1], [2, 1], [1, 2], [1, -2], [-1, -2], [-1, 2], [-2, -1], [-2, 1]];

  for (let y = 0; y < val; y++) {
    for (let x = 0; x < val; x++) {
      legalMoves.forEach((coord) => {
        const xDelta = x + coord[0];
        const yDelta = y + coord[1];
        if (xDelta > -1 && xDelta < 8 && yDelta > -1 && yDelta < 8) {
          board[x][y].moves.push(board[xDelta][yDelta]);
        }
      });
    }
  }
}

function generateGraph(val) {
  const board = [];
  for (let x = 0; x < val; x++) {
    const row = [];
    const tiles = document.querySelectorAll(`[data-x="${x}"]`);
    for (let y = 0; y < val; y++) {
      const tile = new Node(x, y, tiles[y]);
      row.push(tile);
    }
    board.push(row);
  }
  addLegalMoves(board, val);
  return board;
}

class Graph {
  constructor(val) {
    this.graph = generateGraph(val);
  }
}

export default Graph;
