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

  const cellStatus = (x, y) => {
    if (grid[x - 1][y - 1].ship.isSunk()) return -3;
    if (grid[x - 1][y - 1].part === -2) return -2;
    if (typeof grid[x - 1][y - 1] === 'object') return 1;
    return grid[x - 1][y - 1];
  };

  return {
    grid,
    placeShip,
    receiveAttack,
    allSunk,
    cellStatus,
  };
};

export default Gameboard;
