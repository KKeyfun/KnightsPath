import Graph from './modules/graph';
import './style.css';
import knightIcon from './assets/knight.png';

const chessBoard = new Graph(8);
console.log(chessBoard.graph[5][1]);

function randomize() {
  document.querySelector('.start')?.classList.remove('start');
  document.querySelector('.end')?.classList.remove('end');

  const startCoords = [generateRandom(), generateRandom()];
  const endCoords = [generateRandom(), generateRandom()];

  moveKnight(startCoords[0], startCoords[1]);

  const startTile = document.querySelector(`[data-x='${startCoords[0]}'][data-y='${startCoords[1]}']`);
  startTile.classList.add('start');

  //   document.querySelector(`[data-x='${endCoords[0]}'][data-y='${endCoords[1]}']`).classList.add('end');
  document.querySelector('[data-x=\'2\'][data-y=\'1\']').classList.add('end'); // debug

  const start = chessBoard.graph[startCoords[0]][startCoords[1]];
  const end = chessBoard.graph[endCoords[0]][endCoords[1]];

  console.log(chessBoard.graph[0][0].moves);
  console.log(getShortestPath(chessBoard.graph[0][0], chessBoard.graph[1][2]));
}

function generateRandom() {
  return Math.floor(Math.random() * 8);
}

window.onload = () => {
  document.querySelector('.random').addEventListener('click', randomize);
  document.querySelector('.knight').src = knightIcon;
};

function moveKnight(x, y) {
  const knight = document.querySelector('.knight');
  knight.style.top = `${y * 6 + 0.5}rem`;
  knight.style.left = `${x * 6 + 0.5}rem`;
}

function getShortestPath(startNode, endNode, path = []) {
  console.log(startNode, endNode);

  moveKnight(startNode.x, startNode.y);
  startNode.element.classList.add('visited'); // debug

  const legalMoves = startNode.moves;
  const paths = []; // testing

  return path.concat(...test);
}
