import Gameboard from './Gameboard.js';

const Player = (enemyBoard) => {
  let turn = false;

  const attack = (x, y) => {
    if (turn) {
      const result = enemyBoard.receiveAttack(x, y);
      turn = result === 1 ? true : result === 2;
      if (result > 1) return true;
    }
    return false;
  };

  const isTurn = () => turn;

  const changeTurn = (newTurn) => {
    turn = newTurn;
  };

  const aiMove = () => {
    let x;
    let y;
    let canExit = false;
    while (!canExit) {
      x = Math.floor(Math.random() * 10) + 1;
      y = Math.floor(Math.random() * 10) + 1;
      const result = enemyBoard.receiveAttack(x, y);
      turn = result !== 3;
      if (result > 1) canExit = true;
    }
    return [x, y];
  };

  return {
    attack,
    isTurn,
    aiMove,
    changeTurn,
  };
};

export default Player;
