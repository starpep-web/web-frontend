import { formatNumberDecimals } from './number';

describe('Utils: Number', () => {
  describe('formatNumberDecimals()', () => {
    it('should return an string with the formatted number.', () => {
      expect(formatNumberDecimals(3.1415, 2)).toBe('3.14');
      expect(formatNumberDecimals(2.15, 3)).toBe('2.150');
    });
  });
});
