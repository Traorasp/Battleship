import Player from './Player.js';
import Gameboard from './Gameboard.js';

const gameloop = (() => {
  const boardOne = Gameboard();
  const boardTwo = Gameboard();

  boardOne.placeShip([1, 1, 1], [1, 2, 3]);
  boardOne.placeShip([7, 8, 9], [1, 1, 1]);
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

  const checkSides = (x, y, playersBoard) => {
    const board = playersBoard === 1 ? document.querySelector('.P1 .board .grid')
      : document.querySelector('.P2 .board .grid');
    const gridChild = ((x - 1) * 10) + (y - 1);

    const currCell = board.children.item(gridChild);
    const currX = currCell.classList[0].slice(1);
    const currY = currCell.classList[1].slice(1);

    const relatedCells = [
      board.children.item(gridChild - 10),
      board.children.item(gridChild - 11),
      board.children.item(gridChild - 1),
      board.children.item(gridChild + 9),
      board.children.item(gridChild + 10),
      board.children.item(gridChild + 11),
      board.children.item(gridChild + 1),
      board.children.item(gridChild - 9),
    ];

    relatedCells.forEach((cell) => {
      if (cell !== null) {
        const cellX = cell.classList[0].slice(1);
        const cellY = cell.classList[1].slice(1);
        if ((currX !== cellX || (currX === cellX && Math.abs(currY - cellY) < 9))
        && (currY !== cellY || (currY === cellY && Math.abs(currX - cellX) < 9))
        && (Math.abs(currX - cellX) < 2) && (Math.abs(currY - cellY) < 2)) {
          switch (cell.classList[3]) {
            case 'miss':
              break;
            case 'sunk':
              break;
            case 'sunk-part':
              cell.classList.remove('sunk-part');
              cell.classList.add('sunk');
              checkSides(cell.classList[0].slice(1), cell.classList[1].slice(1), playersBoard);
              break;
            default:
              cell.classList.add('miss');
              break;
          }
        }
      }
    });
  };

  const updateBoard = (x, y, playersBoard) => {
    const board = playersBoard === 1 ? document.querySelector('.P1 .board .grid')
      : document.querySelector('.P2 .board .grid');
    const cell = board.children.item(((x - 1) * 10) + (y - 1));
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
        checkSides(x, y, playersBoard);
        break;
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
})();

export default gameloop;
