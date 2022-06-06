import Gameboard from './Gameboard';

test('Gameboard creates a 3 by 3 array of 0s', () => {
  const col = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  expect(Gameboard().grid).toEqual([col, col, col, col, col, col, col, col, col, col]);
});

test('Can add ship 3 wide to board at cord (5,5)', () => {
  const board = Gameboard();
  board.placeShip([5, 6, 7], [5, 5, 5]);
  expect(board.grid[4][4].part).toBe(0);
  expect(board.grid[5][4].part).toBe(1);
  expect(board.grid[6][4].part).toBe(2);
});

test('Checks if received hit can hit a ship', () => {
  const board = Gameboard();
  board.placeShip([5, 6, 7], [5, 5, 5]);
  board.receiveAttack(6, 5);
  expect(board.grid[5][4].ship.cond).toEqual([1, 0, 1]);
  board.receiveAttack(7, 5);
  expect(board.grid[6][4].ship.cond).toEqual([1, 0, 0]);
});

test('Checks if received hit can change spacec from 0 to -1', () => {
  const board = Gameboard();
  board.receiveAttack(6, 5);
  expect(board.grid[5][4]).toBe(-1);
});

test('Checks if allSunken works when there are no ships', () => {
  expect(Gameboard().allSunk()).toBe(true);
});

test('Checks if allSunken works when one ship remains', () => {
  const board = Gameboard();
  board.placeShip([3, 3], [3, 4]);
  expect(board.allSunk()).toBe(false);
});
