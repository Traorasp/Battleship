import Gameboard from './Gameboard';

test('Gameboard creates a 3 by 3 array of 0s', () => {
  const col = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  expect(Gameboard().grid).toEqual([col, col, col, col, col, col, col, col, col, col]);
});

test('Can add ship 3 wide to board at cord (5,5)', () => {
  const board = Gameboard();
  board.placeShip([5, 6, 7], [5, 5, 5]);
  expect(board.grid[4][4].part).toBe(0);
});

test('Can add ship 3 wide to board at cord (5,5)', () => {
  const board = Gameboard();
  board.placeShip([5, 6, 7], [5, 5, 5]);
  expect(board.grid[5][4].part).toBe(1);
});

test('Can add ship 3 wide to board at cord (5,5)', () => {
  const board = Gameboard();
  board.placeShip([5, 6, 7], [5, 5, 5]);
  expect(board.grid[6][4].part).toBe(2);
});
