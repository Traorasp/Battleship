import ship from './Ship';

test('creates a ship 3 long with x[1,2,3] and y[1, 1 ,1]', () => {
  expect(ship(3, [1, 2, 3], [1, 1, 1])).toEqual({
    size: 3,
    x: [1, 2, 3],
    y: [1, 1, 1],
  });
});
