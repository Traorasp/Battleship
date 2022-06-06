import createShip from './createShip';

test('creates a ship 3 long', () => {
  expect(createShip(3)).toEqual({
    ship: [1, 1, 1],
  });
});
