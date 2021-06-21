const gameBoard = (() => {
  "use strict";

  const board = [1, 2, 3, 4, 5, 6, 7, 8];
})();

const playerFactory = (name, symbol) => {
  const sayHello = () => console.log("Hello!")
  return { name, symbol, sayHello };
};