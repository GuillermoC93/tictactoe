const playerFactory = (symbol) => {
  return { symbol };
};

const gameBoard = (() => {
  "use strict";

  let board = ["", "", "", "", "", "", "", "", ""];

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

  const reset = () => {
    for (let i = 0; i < board.length; i++) {
      board[i] = "";
    }
  };

  return { board, rowWin, columnWin, diagonalWin, reset }
})();

const displayController = (() => {
  "use strict";

  const grid = document.querySelector(".container");
  const cells = document.querySelectorAll('[data-index]');
  const displayText = document.querySelector(".gameDisplay");
  const btn = document.querySelector(".btn");

  btn.addEventListener("mouseover", () => {
    btn.classList.toggle("btn-hover");
  });

  btn.addEventListener("mouseout", () => {
    btn.classList.toggle("btn-hover");
  });

  btn.addEventListener("click", () => {
    grid.removeEventListener('click', _clickHandlerO);
    grid.removeEventListener('click', _clickHandlerX);
    gameBoard.reset();
    clearClasses();
    _populateDisplay();
    gameController.gameStart();
  })

  const clearClasses = () => {
    cells.forEach(cell => {
      cell.classList.remove('symbol');
    })
  }

  const _winDisplayX = (bool) => {
    if (bool == true) {
      displayText.textContent = "Player X wins";
      return true
    } else {
      return false
    }
  }

  const _winDisplayO = (bool) => {
    if (bool == true) {
      displayText.textContent = "Player O wins";
      return true
    } else {
      return false
    }
  }

  const _drawDisplay = () => {
    if (!gameController.drawGame()) {
      displayText.textContent = "It's a draw"
    }
  }

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
        displayText.textContent = "Player O's move"
        if (_winDisplayX(gameController.checkWin())) {
          grid.removeEventListener("click", _clickHandlerX);
          return
        };
        _drawDisplay();
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
        displayText.textContent = "Player X's move"
        if (_winDisplayO(gameController.checkWin())) {
          grid.removeEventListener("click", _clickHandlerO);
          return
        };
        _drawDisplay();
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
    displayText.textContent = "Player X's move"
  }

  return { displayMove }

})();

const gameController = (() => {
  "use strict";

  let player1 = playerFactory("X");
  let player2 = playerFactory("O");

  const checkWin = () => {
    if (gameBoard.rowWin()) {
      return true
    } else if (gameBoard.columnWin()) {
      return true
    } else if (gameBoard.diagonalWin()) {
      return true
    } else {
      return false
    }
  }

  const gameStart = function () {
    displayController.displayMove();
  }

  const drawGame = () => {
    return gameBoard.board.includes("")
  }

  return { gameStart, player1, player2, checkWin, drawGame }

})();

gameController.gameStart();
