import { averageGlucose, tirGlucose } from './glucoseCalculation'

test('avg [1, 2, 3] to equal 2', () => {
    expect(averageGlucose([1, 2, 3])).toBe('2.0')
});

test('avg [3, 3, 3] to equal 3', () => {
    expect(averageGlucose([3, 3, 3])).toBe('3.0')
});

test('avg [1] to equal 1', () => {
    expect(averageGlucose([1])).toBe('1.0')
});

test('tir [1, 5, 7, 10] to equal 0.5', () => {
    expect(tirGlucose([1, 5, 7, 10])).toBe('50.0')
})

test('tir [1] to equal 0', () => {
    expect(tirGlucose([1])).toBe('0.0')
})

test('tir [5, 6, 7] to equal 1', () => {
    expect(tirGlucose([5, 6, 7])).toBe('100.0')
})

test('tir [] to equal 0', () => {
    expect(tirGlucose([])).toBe('0.0%')
})