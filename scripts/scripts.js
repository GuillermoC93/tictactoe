const playerFactory = (name, symbol) => {
  return { name, symbol };
};

const gameBoard = (() => {
  "use strict";

  const board = ["", "", "", "", "", "", "", "", ""];

  return { board }
})();

const displayController = (() => {
  "use strict";

  const grid = document.querySelector(".container");
  const cells = document.querySelectorAll('[data-index]');

  // populates display with gameBoard contents
  const populateDisplay = function() {
    cells.forEach((cell, index) => {
    cell.textContent = gameBoard.board[index];
  })};

  const handler = (event) => {
    if (event.target != grid) {
      event.target.classList.toggle('hover')
    }
  };

  // event handlers for mouseover effect
  grid.addEventListener("mouseover", handler);
  grid.addEventListener("mouseout", handler);

  // function for displaying each player move to the onscreen board
  const displayMove = (player) => {
    grid.addEventListener("click", event => {
      if (event.target != grid) {
        if (gameBoard.board[event.target.dataset.index] == "") {
          gameBoard.board[event.target.dataset.index] = player.symbol
          event.target.classList.toggle('symbol')
          populateDisplay()
        } else {
          return
        }
      }
    })
  }

  return { displayMove }
})();