import { NextApiRequest, NextApiResponse } from 'next';
import HttpStatus from 'http-status-codes';
import { ResponseBuilder, ResponseBody } from '@lib/utils/http';
import { createHandler } from '@lib/utils/api';
import { getFunctionSuggestions } from '@lib/services/graphDb/searchService';

const getHandler = async (req: NextApiRequest, res: NextApiResponse<ResponseBody>) => {
  const name = Array.isArray(req.query.name) ? req.query.name[0] : req.query.name ?? '';
  const pageString = Array.isArray(req.query.page) ? req.query.page[0] : req.query.page ?? '1';
  const page = parseInt(pageString, 10);
  const suggestions = await getFunctionSuggestions(name, page);

  const response = new ResponseBuilder()
    .withStatusCode(HttpStatus.OK)
    .withData(suggestions);

  res.status(response.statusCode).send(response.build());
};

export default createHandler({
  GET: getHandler
});
