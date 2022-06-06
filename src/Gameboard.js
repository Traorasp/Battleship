import createShip from './createShip';

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

  const receiveAttack = (x, y) => {
    if (grid[x - 1][y - 1] !== 0) {
      grid[x - 1][y - 1].ship.hit(grid[x - 1][y - 1].part);
    } else {
      grid[x - 1][y - 1] = -1;
    }
  };

  const allSunk = () => {
    let noShips = true;
    grid.forEach((col) => {
      col.forEach((val) => {
        if (val !== 0 && val !== -1 && !val.ship.isSunk()) {
          noShips = false;
        }
      });
    });
    return noShips;
  };

  return {
    grid,
    placeShip,
    receiveAttack,
    allSunk,
  };
};

export default Gameboard;
