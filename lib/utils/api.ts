/* eslint-disable no-unused-vars */
import { NextApiRequest, NextApiResponse } from 'next';
import { ResponseBuilder } from '@lib/utils/http';
import { MethodNotAllowedError, InternalServerError, HttpError } from '@lib/errors/http';

export type HandlerFunction = (req: NextApiRequest, res: NextApiResponse) => void
export type ErrorHandlerFunction = (error: Error, req: NextApiRequest, res: NextApiResponse) => void

export const SUPPORTED_METHODS = ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'] as const;
export type SupportedMethod = typeof SUPPORTED_METHODS[number];

export type MethodHandlers = {
  [k in SupportedMethod]?: HandlerFunction
}

const methodNotSupportedHandler: HandlerFunction = (_, res: NextApiResponse) => {
  const response = new ResponseBuilder().withError(new MethodNotAllowedError());
  res.status(response.statusCode).send(response.build());
};

const errorHandler: ErrorHandlerFunction = (error: Error, _, res: NextApiResponse) => {
  const response = new ResponseBuilder()
    .withError(error instanceof HttpError ? error : new InternalServerError(error.message));
  res.status(response.statusCode).send(response.build());
};

export const createHandler = (handlers: MethodHandlers): HandlerFunction => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    if (!req.method) {
      return methodNotSupportedHandler(req, res);
    }

    const handler = handlers[req.method as SupportedMethod];
    if (!handler) {
      return methodNotSupportedHandler(req, res);
    }

    try {
      return await handler(req, res);
    } catch (error) {
      return errorHandler(error as Error, req, res);
    }
  };
};
