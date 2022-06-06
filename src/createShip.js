const createShip = (size) => {
  const cond = [];
  for (let i = 0; i < size; i += 1) {
    cond.push(1);
  }

  const hit = (shot) => {
    cond[shot] = 0;
  };

  const isSunk = () => !cond.includes(1);

  return {
    cond,
    hit,
    isSunk,
  };
};

export default createShip;
