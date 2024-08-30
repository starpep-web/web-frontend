import { partitionArray, joinWithDifferentLastSeparator } from './array';

describe('Utils: Array', () => {
  describe('partitionArray()', () => {
    it('should return an array with partitioned arrays inside.', () => {
      const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      const expected = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [10]
      ];

      expect(partitionArray(arr, 3)).toStrictEqual(expected);
    });
  });

  describe('joinWithDifferentLastSeparator()', () => {
    const separator = ', ';
    const lastSeparator = ', and ';

    it('should return an empty string if array has no items.', () => {
      const actual = joinWithDifferentLastSeparator([], separator, lastSeparator);
      expect(actual).toBe('');
    });

    it('should return a string with only last item if array has 1 item.', () => {
      const actual = joinWithDifferentLastSeparator(['hi'], separator, lastSeparator);
      expect(actual).toBe('hi');
    });

    it('should return a string with only last separator if array has 2 items.', () => {
      const actual = joinWithDifferentLastSeparator(['hi', 'bye'], separator, lastSeparator);
      expect(actual).toBe('hi, and bye');
    });

    it('should return a correctly joined string.', () => {
      const actual = joinWithDifferentLastSeparator([1, 2, 3, 4], separator, lastSeparator);
      expect(actual).toBe('1, 2, 3, and 4');
    });
  });
});
