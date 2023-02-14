import { NextApiRequest, NextApiResponse } from 'next';
import HttpStatus from 'http-status-codes';
import { ResponseBuilder, ResponseBody } from '@lib/utils/http';
import { getCTerminusSuggestions } from '@lib/services/graphDb/searchService';

const handler = async (req: NextApiRequest, res: NextApiResponse<ResponseBody>) => {
  const name = Array.isArray(req.query.name) ? req.query.name[0] : req.query.name ?? '';
  const suggestions = await getCTerminusSuggestions(name);

  const response = new ResponseBuilder()
    .withStatusCode(HttpStatus.OK)
    .withData(suggestions);

  res.status(response.statusCode).send(response.build());
};

export default handler;
