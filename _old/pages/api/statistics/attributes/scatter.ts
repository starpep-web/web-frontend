import { NextApiRequest, NextApiResponse } from 'next';
import HttpStatus from 'http-status-codes';
import { ResponseBuilder, ResponseBody } from '@lib/utils/http';
import { BadRequestError } from '@lib/errors/http';
import { createHandler } from '@lib/utils/api';
import { getScatterForAttributes } from '@lib/services/graphDb/statisticsService';

const getHandler = async (req: NextApiRequest, res: NextApiResponse<ResponseBody>) => {
  const xAttribute = Array.isArray(req.query.x) ? req.query.x[0] : req.query.x;
  const yAttribute = Array.isArray(req.query.y) ? req.query.y[0] : req.query.y;

  if (!xAttribute) {
    throw new BadRequestError('x query parameter is required.');
  }
  if (!yAttribute) {
    throw new BadRequestError('y query parameter is required.');
  }

  try {
    const scatter = await getScatterForAttributes(xAttribute, yAttribute);
    const response = new ResponseBuilder()
      .withStatusCode(HttpStatus.OK)
      .withData(scatter);

    res.status(response.statusCode).send(response.build());
  } catch (error) {
    if (error instanceof TypeError) {
      throw new BadRequestError(error.message);
    }

    throw error;
  }
};

export default createHandler({
  GET: getHandler
});
