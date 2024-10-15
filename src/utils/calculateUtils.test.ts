import { calculateRating } from './calculateUtils';

describe('calculateRating', () => {
    it('should return 0 when ratings is empty', () => {
        expect(calculateRating([])).toBe(0);
    });
    it('return 5 when ratings is [5]', () => {
        expect(calculateRating([5])).toBe(5);
    });
    it('return the average of ratings when ratings is [1, 2, 3, 4, 5]', () => {
        expect(calculateRating([1, 2, 3, 4, 5])).toBe(3);
    });
    it('return the average of ratings when ratings is [1, 2, 3, 4, 5, 5]', () => {
        expect(calculateRating([1, 2, 3, 4, 5, 5])).toBe(3.3333333333333335);
    });
    it('return the average of ratings when ratings is [5, 3, 2, 5, 5, 5]', () => {
        expect(calculateRating([5, 3, 2, 5, 5, 5])).toBe(4.166666666666667);
    });
});
