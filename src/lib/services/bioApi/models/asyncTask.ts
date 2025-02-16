export type InitialAsyncTaskResponse<TData = null> = {
  id: string
  name: string
  loading: true
  success: boolean
  context: null
  data: TData
}

export type AsyncTaskResponse<TData, TContext = null> = InitialAsyncTaskResponse<TData | null>
  | {
  id: string
  name: string
  loading: false
  success: true
  context: TContext
  data: TData
}
  | {
  id: string
  name: string
  loading: false
  success: false
  context: TContext | null
  data: string
}
