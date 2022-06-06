import Gameboard from './Gameboard';

const Player = (enemyBoard) => {
  const attack = (x, y) => {
    enemyBoard.receiveAttack(x, y);
  };

  return {
    attack,
  };
};

export default Player;
