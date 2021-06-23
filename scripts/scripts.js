const playerFactory = (name, symbol) => {
  const sayHello = () => console.log("Hello!")
  return { name, symbol, sayHello };
};

const gameBoard = (() => {
  "use strict";

  const board = ["X", "O", "X", "O", "X", "O", "X", "O", "X"];

  return { board }
})();

const displayController = (() => {
  "use strict";

  const grid = document.querySelector(".container");
  const cells = document.querySelectorAll('[data-index]');

  cells.forEach((cell, index) => {
    cell.textContent = gameBoard.board[index];
    cell.classList.toggle('symbol');
  });

  const handler = (event) => {
    if (event.target != grid) {
      event.target.classList.toggle('hover')
    }
  };

  // event handlers for mouseover effect
  grid.addEventListener("mouseover", handler);
  grid.addEventListener("mouseout", handler);
})();
