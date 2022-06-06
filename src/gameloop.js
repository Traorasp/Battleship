import Player from './Player.js';
import Gameboard from './Gameboard.js';

const gameloop = (() => {
  const boardOne = Gameboard();
  const boardTwo = Gameboard();

  boardOne.placeShip([1, 1, 1], [1, 2, 3]);
  boardOne.placeShip([1, 2, 3], [1, 1, 1]);
  boardOne.placeShip([5, 5], [8, 9]);
  boardOne.placeShip([8], [3]);
  boardOne.placeShip([2, 3], [6, 6]);

  boardTwo.placeShip([1, 1, 1], [1, 2, 3]);
  boardTwo.placeShip([1, 2, 3], [1, 1, 1]);
  boardTwo.placeShip([5, 5], [8, 9]);
  boardTwo.placeShip([8], [3]);
  boardTwo.placeShip([2, 3], [6, 6]);

  const p1 = Player(boardTwo);
  const p2 = Player(boardOne);

  for (let i = 1; i <= 2; i += 1) {
    const player = i === 1 ? 'P1' : 'P2';

    const body = document.querySelector('body');

    const side = document.createElement('div');
    side.classList.add('side', `${player}`);
    body.appendChild(side);

    const board = document.createElement('div');
    board.classList.add('board');
    body.appendChild(board);

    const boardXCord = document.createElement('div');
    boardXCord.classList.add('x-cord');
    board.appendChild(boardXCord);

    for (let i = 0; i <= 10; i += 1) {
      const cord = document.createElement('div');
      cord.textcontent = i === 0 ? '' : `${i}`;
      boardXCord.appendChild(cord);
    }

    const boardYCord = document.createElement('div');
    boardYCord.classList.add('y-cord');
    board.appendChild(boardYCord);

    for (let k = 1; k < 10; k += 1) {
      const cord = document.createElement('div');
      cord.textcontent = `${k}`;
      boardYCord.appendChild(cord);
    }

    for (let x = 1; x <= 10; x += 1) {
      for (let y = 1; y <= 10; y += 1) {
        const cell = document.createElement('div');
        cell.classList.add(`${x}`, `${y}`);
        board.appendChild(cell);
        cell.addEventListener('click', (e) => {
          console.log(e.target.classList[0]);
          console.log(e.target.classList[1]);
        });
      }
    }
  }
})();

export default gameloop;
