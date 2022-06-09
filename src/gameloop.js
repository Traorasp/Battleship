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

  const p1 = Player(boardOne);
  const p2 = Player(boardTwo);

  p1.isTurn();

  for (let i = 1; i <= 2; i += 1) {
    const player = i === 1 ? 'P1' : 'P2';

    const body = document.querySelector('body');

    const side = document.createElement('div');
    side.classList.add('side', `${player}`);
    body.appendChild(side);

    const board = document.createElement('div');
    board.classList.add('board');
    side.appendChild(board);

    const boardXCord = document.createElement('div');
    boardXCord.classList.add('x-cord');
    board.appendChild(boardXCord);

    for (let a = 0; a <= 10; a += 1) {
      const cord = document.createElement('div');
      cord.innerText = a === 0 ? '0' : `${a}`;
      boardXCord.appendChild(cord);
    }

    const boardYCord = document.createElement('div');
    boardYCord.classList.add('y-cord');
    board.appendChild(boardYCord);

    for (let k = 1; k <= 10; k += 1) {
      const cord = document.createElement('div');
      cord.innerText = `${k}`;
      boardYCord.appendChild(cord);
    }

    const grid = document.createElement('div');
    grid.classList.add('grid');
    board.appendChild(grid);

    for (let x = 1; x <= 10; x += 1) {
      for (let y = 1; y <= 10; y += 1) {
        const cell = document.createElement('div');
        cell.classList.add(`X${x}`, `Y${y}`, `B${player}`);
        grid.appendChild(cell);
        cell.addEventListener('click', (e) => {
          round(e);
        });
      }
    }
  }

  const updateBoard = (x, y, playersBoard) => {
    if (playersBoard === 1) {
      const cell = document.querySelector('.P1 .board .grid').children.item(((x - 1) * 10) + (y - 1));
      switch (boardOne.cellStatus(x, y)) {
        case 0:
          break;
        case -1:
          cell.classList.add('miss');
          break;
        case -2:
          cell.classList.add('sunk-part');
          break;
        default:
          cell.classList.add('sunk');
          break;
      }
    } else {
      const cell = document.querySelector('.P2 .board .grid').children.item(((x - 1) * 10) + (y - 1));
      switch (boardTwo.cellStatus(x, y)) {
        case 0:
          break;
        case -1:
          cell.classList.add('miss');
          break;
        case -2:
          cell.classList.add('sunk-part');
          break;
        default:
          cell.classList.add('sunk');
          break;
      }
    }
  };

  const round = (cell) => {
    const x = cell.target.classList[0].slice(1);
    const y = cell.target.classList[1].slice(1);
    const playersBoard = cell.target.classList[2].slice(1);
    if (playersBoard === 'P1' && !p1.attack(x, y)) {
      if (!boardTwo.allSunk()) {
        updateBoard(x, y, 1);
        p2.isTurn();
      }
      if (!boardOne.allSunk()) {
        const aiShot = p2.aiMove();
        updateBoard(aiShot[0], aiShot[1], 2);
        p1.isTurn();
      }
    }
  };
})();

export default gameloop;
