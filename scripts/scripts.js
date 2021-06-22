const gameBoard = (() => {
  "use strict";

  const board = [1, 2, 3, 4, 5, 6, 7, 8, 9];
})();

const displayController = (() => {
  "use strict";

  const grid = document.querySelector(".container")

  const handler = (event) => {
    if (event.target != grid) {
      event.target.classList.toggle('hover')
    }
  }

  grid.addEventListener("mouseover", handler)
  grid.addEventListener("mouseout", handler)

})();

const playerFactory = (name, symbol) => {
  const sayHello = () => console.log("Hello!")
  return { name, symbol, sayHello };
};