export type InitialAsyncTaskResponse = {
  id: string
  name: string
  loading: true
  success: boolean
  context: null
  data: null
}

export type AsyncTaskResponse<TData, TContext = null> = InitialAsyncTaskResponse
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
