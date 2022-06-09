import Gameboard from './Gameboard.js';

const Player = (enemyBoard) => {
  let turn = false;

  const attack = (x, y) => {
    if (turn) {
      turn = !enemyBoard.receiveAttack(x, y);
      if (!turn) return turn;
    }
    return true;
  };

  const isTurn = () => {
    turn = true;
  };

  const aiMove = () => {
    let x;
    let y;
    while (turn) {
      x = Math.floor(Math.random() * 10) + 1;
      y = Math.floor(Math.random() * 10) + 1;
      turn = !enemyBoard.receiveAttack(x, y);
    }
    return [x, y];
  };

  return {
    attack,
    isTurn,
    aiMove,
  };
};

export default Player;
