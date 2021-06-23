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

  // handler for hover over mouse event
  const hoverHandler = (event) => {
    if (event.target != grid) {
      event.target.classList.toggle('hover')
    }
  };

  // handler for click event
  const clickHandler = (player) => {
    return function(event) {
      if (event.target != grid) {
        if (gameBoard.board[event.target.dataset.index] == "") {
          gameBoard.board[event.target.dataset.index] = player.symbol
          event.target.classList.toggle('symbol');
          populateDisplay();
        } else {
          return
        }
      }
    }
  }

  // event handlers for mouseover effect
  grid.addEventListener("mouseover", hoverHandler);
  grid.addEventListener("mouseout", hoverHandler);

  // function for displaying each player move to the onscreen board
  // uses a "once" option to only fire the event listener once
  const displayMove = (player) => {
    grid.addEventListener("click", clickHandler(player), { once: true });
  }

  return { displayMove }

})();

const gameController = (() => {
  "use strict";

  let player1 = playerFactory("john", "X");
  let player2 = playerFactory("amy", "O");
  let currentPlayer = player1

  const switchPlayer = () => {
    if (currentPlayer == player1) {
      currentPlayer = player2 
    } else {
      return
    }
  }

  const gameStart = function () {
    displayController.displayMove(currentPlayer);
    switchPlayer();
  }

  return { gameStart }

})();

gameController.gameStart();