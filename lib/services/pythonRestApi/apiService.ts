import axios, { AxiosError } from 'axios';
import { PYTHON_REST_API_URL } from '@lib/config';
import { HttpError, InternalServerError } from '@lib/errors/http';

export const http = axios.create({
  baseURL: PYTHON_REST_API_URL
});

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

export const FASTA_CONTENT_TYPE = 'text/x-fasta';

export type PythonApiErrorResponse = {
  message: string
  description: string
  status: number
}

export const resolveAxiosError = (error: AxiosError | unknown): HttpError => {
  if (error instanceof AxiosError && error.response?.data) {
    const errorResponse = error.response.data as PythonApiErrorResponse;
    return new HttpError(errorResponse.message, errorResponse.status, errorResponse.description);
  }

  console.error(error);
  return new InternalServerError((error as Error)?.message);
};
