import { bitArrayToBase64, BitArray } from './export';

describe('Utils: Export', () => {
  describe('bitArrayToBase64()', () => {
    it('should throw if attempting to convert empty array.', () => {
      expect(() => {
        bitArrayToBase64([]);
      }).toThrow();
    });

    it('should return a base64 string corresponding to the base64 representation of the bit array.', () => {
      const arr: BitArray = [0, 0, 1, 1, 1, 1, 0, 0];
      const expected = 'PA==';

      expect(bitArrayToBase64(arr)).toBe(expected);
    });

    it('should return a base64 string corresponding to the base64 representation of the bit array even if arr contains incomplete bytes.', () => {
      const arr: BitArray = [0, 1, 1, 0, 1];
      const expected = 'aA==';

      expect(bitArrayToBase64(arr)).toBe(expected);
    });

    it('should return a base64 string corresponding to the base64 representation of the bit array for an absurdly big array.', () => {
      const arr: BitArray = '1'.repeat(45120).split('').map((n) => parseInt(n, 10)) as BitArray;
      const expected = '/'.repeat(7520);

      expect(bitArrayToBase64(arr)).toBe(expected);
    });
  });
});
