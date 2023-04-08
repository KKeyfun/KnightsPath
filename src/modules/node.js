class Node {
  constructor(x, y, element) {
    this.occupied = false;
    this.moves = [];
    this.x = x;
    this.y = y;
    this.element = element;
  }
}

export default Node;
