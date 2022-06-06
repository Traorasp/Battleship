import Gameboard from './Gameboard';

const Player = (enemyBoard) => {
  let turn = false;

  const attack = (x, y) => {
    if (turn) {
      turn = !enemyBoard.receiveAttack(x, y);
    }
  };

  const isTurn = () => {
    turn = true;
  };

  const aiMove = () => {
    if (turn) {
      const x = Math.floor(Math.random() * 10) + 1;
      const y = Math.floor(Math.random() * 10) + 1;
      turn = enemyBoard.receiveAttack(x, y);
    }
  };

  return {
    attack,
    isTurn,
    aiMove,
  };
};

export default Player;
