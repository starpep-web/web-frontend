import { createPagination } from './pagination';

describe('Utils: Pagination', () => {
  describe('createPagination()', () => {
    it('should throw RangeError if start is not a non-negative integer.', () => {
      expect(() => createPagination(-1, 100, 25)).toThrow(RangeError);
      expect(() => createPagination(1.5, 100, 25)).toThrow(RangeError);
      expect(() => createPagination(NaN, 100, 25)).toThrow(RangeError);
    });

    it('should throw RangeError if total is not a non-zero positive integer.', () => {
      expect(() => createPagination(0, -1, 25)).toThrow(RangeError);
      expect(() => createPagination(0, 1.5, 25)).toThrow(RangeError);
      expect(() => createPagination(0, 0, 25)).toThrow(RangeError);
      expect(() => createPagination(0, NaN, 25)).toThrow(RangeError);
    });

    it('should throw RangeError if countPerPage not a non-zero positive integer..', () => {
      expect(() => createPagination(0, 100, -1)).toThrow(RangeError);
      expect(() => createPagination(0, 100, 1.5)).toThrow(RangeError);
      expect(() => createPagination(0, 100, 0)).toThrow(RangeError);
      expect(() => createPagination(0, 100, NaN)).toThrow(RangeError);
    });

    it('should throw RangeError if start is not lesser than total.', () => {
      expect(() => createPagination(10, 10, 5)).toThrow(RangeError);
      expect(() => createPagination(11, 10, 5)).toThrow(RangeError);
    });

    it('should return the correct number for totalPages.', () => {
      expect(createPagination(0, 100, 25).totalPages).toBe(4);
      expect(createPagination(0, 100, 33).totalPages).toBe(4);
    });

    describe('First Page', () => {
      it('should return currentPage as 1.', () => {
        expect(createPagination(0, 100, 25).currentPage).toBe(1);
        expect(createPagination(15, 100, 25).currentPage).toBe(1);
      });

      it('should return previousStart as 0.', () => {
        expect(createPagination(0, 100, 25).previousStart).toBe(0);
        expect(createPagination(15, 100, 25).previousStart).toBe(0);
      });

      it('should return the correct number for nextStart.', () => {
        expect(createPagination(0, 100, 25).nextStart).toBe(25);
        expect(createPagination(25, 100, 25).nextStart).toBe(50);
      });

      it('should return isFirstPage as true.', () => {
        expect(createPagination(0, 100, 25).isFirstPage).toBe(true);
        expect(createPagination(15, 100, 25).isFirstPage).toBe(true);
      });

      it('should return isLastPage as false.', () => {
        expect(createPagination(0, 100, 25).isLastPage).toBe(false);
        expect(createPagination(15, 100, 25).isLastPage).toBe(false);
      });
    });

    describe('Middle Page', () => {
      it('should return the correct number for currentPage.', () => {
        expect(createPagination(25, 100, 25).currentPage).toBe(2);
        expect(createPagination(50, 100, 25).currentPage).toBe(3);
        expect(createPagination(33, 100, 33).currentPage).toBe(2);
      });

      it('should return the correct number for previousStart.', () => {
        expect(createPagination(50, 100, 25).previousStart).toBe(25);
        expect(createPagination(75, 100, 25).previousStart).toBe(50);
        expect(createPagination(66, 100, 33).previousStart).toBe(33);
      });

      it('should return the correct number for nextStart.', () => {
        expect(createPagination(25, 100, 25).nextStart).toBe(50);
        expect(createPagination(50, 100, 25).nextStart).toBe(75);
        expect(createPagination(66, 100, 33).nextStart).toBe(99);
      });

      it('should return isFirstPage as false.', () => {
        expect(createPagination(25, 100, 25).isFirstPage).toBe(false);
        expect(createPagination(33, 100, 33).isFirstPage).toBe(false);
      });

      it('should return isLastPage as false.', () => {
        expect(createPagination(25, 100, 25).isLastPage).toBe(false);
        expect(createPagination(33, 100, 33).isLastPage).toBe(false);
      });
    });

    describe('Last Page', () => {
      it('should return the correct number for currentPage.', () => {
        expect(createPagination(75, 100, 25).currentPage).toBe(4);
        expect(createPagination(99, 100, 33).currentPage).toBe(4);
      });

      it('should return the correct number for previousStart.', () => {
        expect(createPagination(75, 100, 25).previousStart).toBe(50);
        expect(createPagination(99, 100, 33).previousStart).toBe(66);
      });

      it('should return the last valid nextStart for nextStart.', () => {
        expect(createPagination(75, 100, 25).nextStart).toBe(75);
        expect(createPagination(88, 100, 25).nextStart).toBe(75);
        expect(createPagination(99, 100, 33).nextStart).toBe(99);
      });

      it('should return isFirstPage as false.', () => {
        expect(createPagination(75, 100, 25).isFirstPage).toBe(false);
        expect(createPagination(99, 100, 33).isFirstPage).toBe(false);
      });

      it('should return isLastPage as true.', () => {
        expect(createPagination(75, 100, 25).isLastPage).toBe(true);
        expect(createPagination(99, 100, 33).isLastPage).toBe(true);
      });
    });
  });
});
