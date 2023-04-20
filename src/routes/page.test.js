import { describe,  expect, test } from 'vitest'
import { countNeighbors, nextGeneration } from './+page.svelte';

describe('countNeighbors', () => {
    test('returns 9 when all neighbors are alive', () => {
        expect(countNeighbors(1, 1, [
            [true, true, true],
            [true, true, true],
            [true, true, true],
        ])).toBe(8)
    });
    test('returns 0 when all neighbors are dead', () => {
        expect(countNeighbors(1, 1, [
            [false, false, false],
            [false, true, false],
            [false, false, false],
        ])).toBe(0)
    });
});

describe('nextGeneration', () => {
    describe('still lifes stay the same', () => {
        test('block', () => {
            const block = [
                [false, false, false, false],
                [false, true, true, false],
                [false, true, true, false],
                [false, false, false, false],
              ];
            expect(nextGeneration(block)).toStrictEqual(block);
        });
        test('bee-hive', () => {
            const beeHive = [
                [false, false, false, false, false, false],
                [false, false, true , true , false, false],
                [false, true , false, false, true , false],
                [false, false, true , true , false, false],
                [false, false, false, false, false, false],
              ];
            expect(nextGeneration(beeHive)).toStrictEqual(beeHive);
        });
        test('loaf', () => {
            const loaf = [
                [false, false, false, false, false, false],
                [false, false, true , true , false, false],
                [false, true , false, false, true , false],
                [false, false, true , false, true , false],
                [false, false, false, true , false, false],
                [false, false, false, false, false, false],
              ];
            expect(nextGeneration(loaf)).toStrictEqual(loaf);
        });
        test('boat', () => {
            const boat = [
                [false, false, false, false, false],
                [false, true , true , false, false],
                [false, true , false, true , false],
                [false, false, true , false, false],
                [false, false, false, false, false],
              ];
            expect(nextGeneration(boat)).toStrictEqual(boat);
        });
        test('tub', () => {
            const tub = [
                [false, false, false, false, false],
                [false, false, true , false, false],
                [false, true , false, true , false],
                [false, false, true , false, false],
                [false, false, false, false, false],
              ];
            expect(nextGeneration(tub)).toStrictEqual(tub);
        });
    });
    describe('oscillators switch back and forth between two shapes', () => {
        test('blinker', () => {
            const blinker1 = [
                [false, false, false, false, false],
                [false, false, true , false, false],
                [false, false, true , false, false],
                [false, false, true , false, false],
                [false, false, false, false, false],
              ];
            const blinker2 = [
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, true , true , true , false],
                [false, false, false, false, false],
                [false, false, false, false, false],
              ];
            expect(nextGeneration(blinker1)).toStrictEqual(blinker2);
            expect(nextGeneration(blinker2)).toStrictEqual(blinker1);
        });

    })
});
