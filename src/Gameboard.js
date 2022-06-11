import createShip from './createShip.js';

const Gameboard = () => {
  const grid = [];
  for (let i = 0; i < 10; i += 1) {
    grid.push([]);
    for (let k = 0; k < 10; k += 1) {
      grid[i].push(0);
    }
  }

  const placeShip = (x, y) => {
    const ship = createShip(x.length);
    for (let i = 0; i < x.length; i += 1) {
      grid[x[i] - 1][y[i] - 1] = { ship, part: i };
    }
  };

  const updateGrid = () => {
    let x = 0;
    let y = 0;
    grid.forEach((col) => {
      col.forEach((cell) => {
        if (typeof grid[x][y] === 'object' && cell.ship.isSunk()) grid[x][y] = -3;
        y += 1;
      });
      x += 1;
    });
  };

  const receiveAttack = (xCord, yCord) => {
    const x = xCord - 1;
    const y = yCord - 1;

    if (grid[x][y] <= -1 || (grid[x][y] !== 0 && grid[x][y].ship.cond[grid[x][y].part] === 0)) {
      return false;
    }
    if (grid[x][y] !== 0) {
      grid[x][y].ship.hit(grid[x][y].part);
      grid[x][y].part = -2;
      updateGrid();
    } else {
      grid[x][y] = -1;
    }
    return true;
  };

  const allSunk = () => {
    let noShips = true;
    grid.forEach((col) => {
      col.forEach((val) => {
        if (typeof val === 'object' && val.part !== -2) {
          noShips = false;
        }
      });
    });
    return noShips;
  };

  const cellStatus = (xCord, yCord) => {
    const x = xCord - 1;
    const y = yCord - 1;
    if (typeof grid[x][y] === 'object' && grid[x][y].ship.isSunk()) return -3;
    if (grid[x][y].part === -2) return -2;
    if (typeof grid[x][y] === 'object') return 1;
    return grid[x][y];
  };

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
    switch (cellStatus(x, y)) {
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

  return {
    grid,
    placeShip,
    receiveAttack,
    allSunk,
    cellStatus,
    updateBoard,
  };
};

export default Gameboard;
