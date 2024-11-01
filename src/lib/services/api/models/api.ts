export interface ApiResponse<T> {
  success: boolean
  status: number
  data: T
}

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

export interface WithPagination<T> {
  data: T[]
  pagination: Pagination
}
