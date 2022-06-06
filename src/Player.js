import Gameboard from './Gameboard';

const Player = (enemyBoard) => {
  let turn = false;

  const attack = (x, y) => {
    if (turn) {
      enemyBoard.receiveAttack(x, y);
      turn = false;
    }
  };

  const isTurn = () => {
    turn = true;
  };

  return {
    attack,
    isTurn,
  };
};

export default Player;
