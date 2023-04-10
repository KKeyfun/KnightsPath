import Graph from './modules/graph';
import './style.css';
import knightIcon from './assets/knight.png';
import { clearboard, displayPath } from './modules/display';

const chessBoard = new Graph(8);
let running = false;
async function randomize() {
  if (running) {
    return;
  }

  running = true;

  clearboard();

  const startCoords = [generateRandom(), generateRandom()];
  let endCoords = [generateRandom(), generateRandom()];

  while (startCoords[0] === endCoords[0] && startCoords[1] === endCoords[1]) {
    endCoords = [generateRandom(), generateRandom()];
  }

  const start = chessBoard.graph[startCoords[0]][startCoords[1]];
  const end = chessBoard.graph[endCoords[0]][endCoords[1]];

  const startTile = start.element;
  startTile.classList.add('start');

  document.querySelector(`[data-x='${endCoords[0]}'][data-y='${endCoords[1]}']`).classList.add('end');

  document.querySelector('.startCoord').textContent = startCoords;
  document.querySelector('.endCoord').textContent = endCoords;

  console.log(`Starting at: [${startCoords}] Destination: [${endCoords}]`);
  //   console.log(getShortestPath(start, end));
  await displayPath(getShortestPath(start, end), chessBoard);
  running = false;
}

function generateRandom() {
  return Math.floor(Math.random() * 8);
}

window.onload = () => {
  document.querySelector('.random').addEventListener('click', randomize);
  document.querySelector('.knight').src = knightIcon;
};

function getPaths(startNode) {
  const map = [...new Array(8)].map((e) => new Array(8)); // Empty 8x8 2D array to store links
  const visited = [];
  const queue = [startNode];

  while (queue.length > 0) {
    const nextNode = queue.shift(); // remove first item from queue
    visited.push(nextNode);

    const legalMoves = nextNode.moves;
    legalMoves.forEach((node) => { // breadth traversal
      if (!queue.includes(node) && !visited.includes(node)) {
        map[node.x][node.y] = nextNode; // link tiles
        queue.push(node);
      }
    });
  }
  return map;
}

function getShortestPath(startNode, endNode) {
  const shortestPath = [endNode];
  let currentNode = endNode; // Start from the goal
  const paths = getPaths(startNode); // Do a breadth traversal and store the array

  while (currentNode !== startNode) { // Since we traverse from goal, loop until start reached
    currentNode = paths[currentNode.x][currentNode.y]; // move backwards through chain to beginning
    shortestPath.push(currentNode);
    if (currentNode === startNode) { return shortestPath; }
  }
}
