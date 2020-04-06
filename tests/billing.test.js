import { calculateCost } from '../libs/billing-lib.js';

test('Low tier', () => {
    const storage = 10;
    const cost = 4000;
    const expectedCost = calculateCost(storage);
    expect(cost).toEqual(expectedCost);
});

test('Middle Tier', () => {
    const storage = 100;
    const cost = 20000;
    const expectedCost = calculateCost(storage);
    expect(cost).toEqual(expectedCost);

});

test('Higher Test', () => {
    const storage = 101;
    const cost = 10100;
    const expectedCost = calculateCost(storage);
    expect(cost).toEqual(expectedCost);

});