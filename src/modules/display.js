function animate(x, y, knight, delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      knight.style.top = `${y * 6 + 0.5}rem`;
      knight.style.left = `${x * 6 + 0.5}rem`;
      resolve();
    }, delay);
  });
}

async function moveKnight(path, chessBoard, delay = 0) {
  const knight = document.querySelector('.knight');
  const pathContainer = document.querySelector('.moveContainer');
  while (pathContainer.childElementCount > 1) {
    pathContainer.removeChild(pathContainer.lastChild);
  }

  for (let i = 0; i < path.length; i++) {
    const move = document.createElement('p');
    if (i === 0) {
      await animate(path[i][0], path[i][1], knight, 0);
      chessBoard.graph[path[i][0]][path[i][1]].element.textContent = 'Start';
    } else {
      await animate(path[i][0], path[i][1], knight, delay);
      chessBoard.graph[path[i][0]][path[i][1]].element.textContent = i;
    }

    move.textContent = path[i];
    pathContainer.append(move);
  }
  chessBoard.graph[path[path.length - 1][0]][path[path.length - 1][1]].element.textContent = 'Goal';
}

async function displayPath(arr, chessBoard) {
  const path = [];
  while (arr.length > 0) {
    const node = arr.pop();
    path.push([node.x, node.y]);
  }
  await moveKnight(path, chessBoard, 1200);
  //   console.log(path);
}

function clearboard() {
  document.querySelector('.start')?.classList.remove('start');
  document.querySelector('.end')?.classList.remove('end');
  document.querySelector('.visited')?.classList.remove('visited');
  document.querySelectorAll('.tile').forEach((tile) => tile.textContent = '');
}

export {
  animate, moveKnight, displayPath, clearboard,
};
