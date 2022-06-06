const createShip = (size) => {
  const ship = [];
  for (let i = 0; i < size; i += 1) {
    ship.push(1);
  }
  return {
    ship,
  };
};

export default createShip;
