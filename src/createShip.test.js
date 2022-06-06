import createShip from './createShip';

test('creates a ship 3 long', () => {
  expect(createShip(3).cond).toEqual([1, 1, 1]);
});

test('Hit 3rd part of a ship', () => {
  const boat = createShip(3);
  boat.hit(2);
  expect(boat.cond).toEqual(
    [1, 1, 0],
  );
});

test('Check if isSunk works on sunken ships', () => {
  const boat = createShip(2);
  boat.hit(0);
  boat.hit(1);
  expect(boat.isSunk()).toBe(true);
});

test('Check if isSunk fails on ships that has not sunk', () => {
  const boat = createShip(3);
  expect(boat.isSunk()).toBe(false);
});
