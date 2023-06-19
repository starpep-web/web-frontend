import { NextApiRequest, NextApiResponse } from 'next';
import HttpStatus from 'http-status-codes';
import { ResponseBuilder, ResponseBody } from '@lib/utils/http';
import { createHandler } from '@lib/utils/api';
import { SingleQueryAlignmentOptions } from '@lib/models/search';
import { postSingleQuerySearch } from '@lib/services/pythonRestApi/searchService';
import { DEFAULT_SINGLE_ALIGNMENT_OPTIONS } from '@lib/constants/search';

const postHandler = async (req: NextApiRequest, res: NextApiResponse<ResponseBody>) => {
  const { body } = req;
  const rawThreshold = Array.isArray(req.query.threshold) ? req.query.threshold[0] : req.query.threshold;
  const rawMaxQuantity = Array.isArray(req.query.max_quantity) ? req.query.max_quantity[0] : req.query.max_quantity;

  const options: SingleQueryAlignmentOptions = {
    matrix: Array.isArray(req.query.matrix) ? req.query.matrix[0] : req.query.matrix ?? DEFAULT_SINGLE_ALIGNMENT_OPTIONS.matrix,
    alg: Array.isArray(req.query.alg) ? req.query.alg[0] : req.query.alg ?? DEFAULT_SINGLE_ALIGNMENT_OPTIONS.alg,
    threshold: rawThreshold ? parseFloat(rawThreshold) : DEFAULT_SINGLE_ALIGNMENT_OPTIONS.threshold,
    max_quantity: rawMaxQuantity ? parseInt(rawMaxQuantity, 10) : DEFAULT_SINGLE_ALIGNMENT_OPTIONS.max_quantity
  };

  const singleQueryResult = await postSingleQuerySearch(body, options);

  const response = new ResponseBuilder()
    .withStatusCode(HttpStatus.OK)
    .withData(singleQueryResult);

  res.status(response.statusCode).send(response.build());
};

export default createHandler({
  POST: postHandler
});

