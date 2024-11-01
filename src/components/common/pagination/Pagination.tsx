import React, { Fragment } from 'react';
import { Pagination as PaginationType } from '@lib/services/api/models/api';
import { PaginationItem } from './PaginationItem';

const buildPaginationArray = (current: number, total: number, delta: number = 2): number[] => {
  const min = Math.max(1, current - delta);
  const max = Math.min(total, current + delta);
  const length = max - min + 1;

  return new Array(length).fill(null).map((_, idx) => min + idx);
};

interface Props extends PaginationType {
  className?: string
  paginatedUrlBuilder: (page: number) => string
}

export const Pagination: React.FC<Props> = ({ className, paginatedUrlBuilder, currentPage, totalPages, isFirstPage, isLastPage }) => {
  if (currentPage < 1) {
    return null;
  }

  const pageOptions = buildPaginationArray(currentPage, totalPages);
  const firstPageOption = pageOptions[0];
  const lastPageOption = pageOptions[pageOptions.length - 1];

  const showFirst = 1 < firstPageOption;
  const showLeftEllipsis = 2 < firstPageOption;
  const showLast = lastPageOption < totalPages;
  const showRightEllipsis = lastPageOption < totalPages - 1;

  return (
    <nav className={className} aria-label="Page navigation">
      <ul className="pagination justify-content-center flex-wrap row-gap-2">
        {
          !isFirstPage && (
            <PaginationItem href={paginatedUrlBuilder(currentPage - 1)}>
              <span aria-hidden="true">&laquo;</span>
            </PaginationItem>
          )
        }

        {
          showFirst && (
            <Fragment>
              <PaginationItem href={paginatedUrlBuilder(1)}>
                1
              </PaginationItem>

              {
                showLeftEllipsis && (
                  <PaginationItem href={paginatedUrlBuilder(firstPageOption - 1)}>
                    ...
                  </PaginationItem>
                )
              }
            </Fragment>
          )
        }

        {
          pageOptions.map((page) => (
            <PaginationItem key={page} href={paginatedUrlBuilder(page)} active={page === currentPage}>
              {page}
            </PaginationItem>
          ))
        }

        {
          showLast && (
            <Fragment>
              {
                showRightEllipsis && (
                  <PaginationItem href={paginatedUrlBuilder(lastPageOption + 1)}>
                    ...
                  </PaginationItem>
                )
              }

              <PaginationItem href={paginatedUrlBuilder(totalPages)} disabled={isLastPage}>
                {totalPages}
              </PaginationItem>
            </Fragment>
          )
        }

        {
          !isLastPage && (
            <PaginationItem href={paginatedUrlBuilder(currentPage + 1)}>
              <span aria-hidden="true">&raquo;</span>
            </PaginationItem>
          )
        }
      </ul>
    </nav>
  );
};
