import { NextApiRequest, NextApiResponse } from 'next';
import HttpStatus from 'http-status-codes';
import { ResponseBuilder, ResponseBody } from '@lib/utils/http';

const handler = (_req: NextApiRequest, res: NextApiResponse<ResponseBody>) => {
  const response = new ResponseBuilder()
    .withStatusCode(HttpStatus.OK)
    .withData({ test: 123 });

  res.status(response.statusCode).send(response.build());
};

export default handler;
