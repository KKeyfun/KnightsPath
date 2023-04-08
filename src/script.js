import Graph from './modules/graph';
import './style.css';

function randomize() {
  console.log('wip');
}

window.onload = () => {
  document.querySelector('.random').addEventListener('click', randomize);
  const chessBoard = new Graph(8);
  console.log(chessBoard.graph[5][1]);
};
