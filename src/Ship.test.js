import createShip from './createShip';

test('creates a ship 3 long', () => {
  expect(createShip(3).ship).toEqual([1, 1, 1]);
});

test('Hit 3rd part of a ship', () => {
  const boat = createShip(3);
  boat.hit(3);
  expect(boat.ship).toEqual(
    [1, 1, 0],
  );
});
