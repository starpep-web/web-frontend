import { resolveAxiosError, PythonApiErrorResponse } from './apiService';
import { AxiosError, AxiosResponse } from 'axios';
import { InternalServerError } from '@lib/errors/http';

describe('Services: PythonRestApi: ApiService', () => {
  describe('resolveAxiosError()', () => {
    it('should return an HttpError based on the error response.', () => {
      const expectedError: PythonApiErrorResponse = {
        message: 'Oops',
        description: 'Oops',
        status: 400
      };

      const errorResponse = new AxiosError();
      errorResponse.response = {
        data: expectedError
      } as AxiosResponse;

      const resolvedError = resolveAxiosError(errorResponse);
      expect(resolvedError).toMatchObject({
        _statusCode: expectedError.status
      });
    });

    it('should return an InternalServerError if the error contains no response.', () => {
      const resolvedError = resolveAxiosError(new Error('Oops'));
      expect(resolvedError.statusCode).toBe(new InternalServerError().statusCode);
    });
  });
});
