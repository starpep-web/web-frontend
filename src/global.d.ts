declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_URL?: string

      NEXT_REVALIDATE_TIME?: string
    }
  }
}
