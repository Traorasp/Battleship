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

test('Test ai random move works', () => {
  const enemyBoard = Gameboard();
  const player = Player(enemyBoard);
  player.isTurn();
  player.aiMove();
  let boardAttacked = false;
  enemyBoard.grid.forEach((col) => {
    col.forEach((val) => {
      if (val === -1) {
        boardAttacked = true;
      }
    });
  });
  expect(boardAttacked).toBe(true);
});

test('Test that player can shoot same spot without loosing its turn', () => {
  const enemyBoard = Gameboard();
  const player = Player(enemyBoard);
  player.isTurn();
  player.attack(2, 2);
  player.isTurn();
  player.attack(2, 2);
  player.attack(2, 2);
  player.attack(2, 3);
  expect(enemyBoard.grid[1][2]).toBe(-1);
});
