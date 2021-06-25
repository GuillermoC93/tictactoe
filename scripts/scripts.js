const playerFactory = (name, symbol) => {
  return { name, symbol };
};

const gameBoard = (() => {
  "use strict";

  const board = ["", "", "", "", "", "", "", "", ""];

  const rowWin = () => {
    if (board[0] == board[1] && board[1] == board[2] && board[2] != "") {
      return true
    } else if (board[3] == board[4] && board[4] == board[5] && board[5] != "") {
      return true
    } else if (board[6] == board[7] && board[7] == board[8] && board[8] != "") {
      return true
    } else {
      return false
    }
  }

  const columnWin = () => {
    if (board[0] == board[3] && board[3] == board[6] && board[6] != "") {
      return true
    } else if (board[1] == board[4] && board[4] == board[7] && board[7] != "") {
      return true
    } else if (board[2] == board[5] && board[5] == board[8] && board[8] != "") {
      return true
    } else {
      return false
    }
  }

  const diagonalWin = () => {
    if (board[0] == board[4] && board[4] == board[8] && board[8] != "") {
      return true
    } else if (board[2] == board[4] && board[4] == board[6] && board[6] != "") {
      return true
    } else {
      return false
    }
  }

  return { board, rowWin, columnWin, diagonalWin }
})();

const displayController = (() => {
  "use strict";

  const grid = document.querySelector(".container");
  const cells = document.querySelectorAll('[data-index]');

  // populates display with gameBoard contents
  const _populateDisplay = function() {
    cells.forEach((cell, index) => {
      cell.textContent = gameBoard.board[index];
    })
  };

  // handler for hover over mouse event
  const _hoverHandler = (event) => {
    if (event.target != grid) {
      event.target.classList.toggle('hover')
    }
  };

  // event handlers for mouseover effect
  grid.addEventListener("mouseover", _hoverHandler);
  grid.addEventListener("mouseout", _hoverHandler);

  // handler for click event
  const _clickHandlerX = function(event) {
    if (event.target != grid) {
      if (gameBoard.board[event.target.dataset.index] == "") {
        gameBoard.board[event.target.dataset.index] = gameController.player1.symbol
        event.target.classList.toggle('symbol');
        _populateDisplay();
        if (gameController.checkWin() == true) { console.log("Player 1 wins") }
      } else {
        return
      }
    }
    // remove current clickHandler and add the opposite symbols handler
    grid.removeEventListener("click", _clickHandlerX);
    grid.addEventListener("click", _clickHandlerO)
  }

  const _clickHandlerO = function(event) {
    if (event.target != grid) {
      if (gameBoard.board[event.target.dataset.index] == "") {
        gameBoard.board[event.target.dataset.index] = gameController.player2.symbol
        event.target.classList.toggle('symbol');
        _populateDisplay();
        if (gameController.checkWin() == true) { console.log("Player 2 wins") } 
      } else {
        return
      }
    }
    grid.removeEventListener("click", _clickHandlerO);
    grid.addEventListener("click", _clickHandlerX)
  }

  // function for displaying each player move to the onscreen board
  const displayMove = () => {
    grid.addEventListener("click", _clickHandlerX);
  }

  return { displayMove }

})();

const gameController = (() => {
  "use strict";

  let player1 = playerFactory("john", "X");
  let player2 = playerFactory("amy", "O");

  const gameStart = function () {
    displayController.displayMove();
  }

  const checkWin = () => {
    if (gameBoard.rowWin() == true) {
      return true
    } else if (gameBoard.columnWin() == true) {
      return true
    } else if (gameBoard.diagonalWin() == true) {
      return true
    } else {
      return false
    }
  }

  return { gameStart, player1, player2, checkWin }

})();

gameController.gameStart();