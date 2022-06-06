const createShip = (size) => {
  const ship = [];
  for (let i = 0; i < size; i += 1) {
    ship.push(1);
  }

  const hit = (shot) => {
    ship[shot - 1] = 0;
  };

  return {
    ship,
    hit,
  };
};

export default createShip;
