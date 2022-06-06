import Player from './Player';
import Gameboard from './Gameboard';

test('Player can attack oponents board', () => {
  const enemyBoard = Gameboard();
  const player = Player(enemyBoard);
  player.isTurn();
  player.attack(2, 2);
  expect(enemyBoard.grid[1][1]).toBe(-1);
});

test('Test that player can not attck if it is not his turn', () => {
  const enemyBoard = Gameboard();
  const player = Player(enemyBoard);
  player.attack(2, 2);
  expect(enemyBoard.grid[1][1]).toBe(0);
});
