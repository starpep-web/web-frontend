import { createHandler } from './api';
import { NextApiRequest, NextApiResponse } from 'next';
import { MethodNotAllowedError } from '@lib/errors/http';

const mockedResponse = {
  send: jest.fn()
} as unknown as NextApiResponse;
mockedResponse.status = jest.fn().mockImplementation(() => {
  return mockedResponse;
});

describe('Utils: Api', () => {
  beforeEach(() => {
    (mockedResponse.status as jest.Mock).mockClear();
    (mockedResponse.send as jest.Mock).mockClear();
  });

  describe('createHandler()', () => {
    const testHandler = createHandler({
      GET: (_, res) => res.send('test')
    });

    it('should call the correct handler if the given method is supported.', () => {
      const mockedRequest = { method: 'GET' } as NextApiRequest;
      testHandler(mockedRequest, mockedResponse);

      expect(mockedResponse.send).toHaveBeenCalledWith('test');
    });

    it('should call the method not supported handler if the given method is not supported.', () => {
      const mockedRequest = { method: 'DELETE' } as NextApiRequest;
      testHandler(mockedRequest, mockedResponse);

      const error = new MethodNotAllowedError();
      expect((mockedResponse.send as jest.Mock).mock.calls[0][0]).toMatchObject({
        error: {
          message: error.message,
          name: error.name,
          description: error.description
        }
      });
    });
  });
});
