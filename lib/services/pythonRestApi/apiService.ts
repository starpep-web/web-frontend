import axios from 'axios';
import { PYTHON_REST_API_URL } from '@lib/config';

export const http = axios.create({
  baseURL: PYTHON_REST_API_URL
});

export type InitialAsyncTaskResponse = {
  id: string
  name: string
  loading: true
  success: boolean
  data: null
}

export type AsyncTaskResponse<T> = InitialAsyncTaskResponse
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
