import { averageGlucose } from './glucoseCalculation'

test('avg [1, 2, 3] to equal 2', () => {
    expect(averageGlucose([1, 2, 3])).toBe(2)
});

test('avg [3, 3, 3] to equal 3', () => {
    expect(averageGlucose([3, 3, 3])).toBe(3)
});

test('avg [1] to equal 1', () => {
    expect(averageGlucose([1])).toBe(1)
})