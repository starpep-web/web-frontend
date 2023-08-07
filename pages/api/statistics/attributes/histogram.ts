import { NextApiRequest, NextApiResponse } from 'next';
import HttpStatus from 'http-status-codes';
import { ResponseBuilder, ResponseBody } from '@lib/utils/http';
import { BadRequestError } from '@lib/errors/http';
import { createHandler } from '@lib/utils/api';
import { getHistogramForAttribute } from '@lib/services/graphDb/statisticsService';

const getHandler = async (req: NextApiRequest, res: NextApiResponse<ResponseBody>) => {
  const attribute = Array.isArray(req.query.attribute) ? req.query.attribute[0] : req.query.attribute ?? '';
  const method = Array.isArray(req.query.method) ? req.query.method[0] : req.query.method ?? '';

  try {
    const histogram = await getHistogramForAttribute(attribute, method);
    const response = new ResponseBuilder()
      .withStatusCode(HttpStatus.OK)
      .withData(histogram);

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
