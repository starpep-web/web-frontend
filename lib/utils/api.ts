/* eslint-disable no-unused-vars */
import { NextApiRequest, NextApiResponse } from 'next';
import { ResponseBuilder } from '@lib/utils/http';
import { MethodNotAllowedError } from '@lib/errors/http';

export type HandlerFunction = (req: NextApiRequest, res: NextApiResponse) => void

export const SUPPORTED_METHODS = ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'] as const;
export type SupportedMethod = typeof SUPPORTED_METHODS[number];

export type MethodHandlers = {
  [k in SupportedMethod]?: HandlerFunction
}

const methodNotSupportedHandler: HandlerFunction = (_, res: NextApiResponse) => {
  const response = new ResponseBuilder().withError(new MethodNotAllowedError());
  res.status(response.statusCode).send(response.build());
};

export const createHandler = (handlers: MethodHandlers): HandlerFunction => {
  return (req: NextApiRequest, res: NextApiResponse) => {
    if (!req.method) {
      return methodNotSupportedHandler(req, res);
    }

    const handler = handlers[req.method as SupportedMethod];
    if (!handler) {
      return methodNotSupportedHandler(req, res);
    }

    return handler(req, res);
  };
};
