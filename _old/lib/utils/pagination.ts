export interface Pagination {
  currentIndex: number
  total: number

  currentPage: number
  totalPages: number

  previousStart: number
  nextStart: number

  isFirstPage: boolean
  isLastPage: boolean
}

export type WithPagination<T> = {
  data: T[],
  pagination: Pagination
}

const validateCreatePaginationParameters = (start: number, total: number, step: number) => {
  if (!Number.isInteger(start) || start < 0) {
    throw new RangeError('Start must be a positive integer.');
  }

  if (!Number.isInteger(total) || total < 0) {
    throw new RangeError('Total must be a positive integer.');
  }

  if (!Number.isInteger(step) || step < 1) {
    throw new RangeError('Step must be a non-zero positive integer.');
  }

  if (total !== 0 && start >= total) {
    throw new RangeError('Start must be lesser than total.');
  }
};

export const createPagination = (start: number, total: number, step: number): Pagination => {
  validateCreatePaginationParameters(start, total, step);
  const currentPage = total === 0 ? 1 : Math.floor(start / step) + 1;
  const totalPages = Math.ceil(total / step);

  return {
    currentIndex: start,
    total,

    currentPage,
    totalPages,

    previousStart: total === 0 ? 0 : Math.max(start - step, 0),
    nextStart: Math.min(start + step, Math.max((totalPages - 1) * step, 0)),

    isFirstPage: currentPage === 1 || total === 0,
    isLastPage: currentPage === totalPages || total === 0
  };
};
