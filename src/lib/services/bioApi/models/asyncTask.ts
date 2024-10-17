export type InitialAsyncTaskResponse<T = null> = {
  id: string
  name: string
  loading: true
  success: boolean
  data: T
}

export type AsyncTaskResponse<T> = InitialAsyncTaskResponse<T | null>
  | {
  id: string
  name: string
  loading: false
  success: true
  data: T
}
  | {
  id: string
  name: string
  loading: false
  success: false
  data: string
}
