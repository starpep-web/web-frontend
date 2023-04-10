import { NextApiRequest, NextApiResponse } from 'next';
import HttpStatus from 'http-status-codes';
import { ResponseBuilder, ResponseBody } from '@lib/utils/http';
import { FREQUENCY_FILTER_TYPES, FrequencyFilterType, getFilterAAFrequency, getTotalAAFrequency } from '@lib/services/graphDb/statisticsService';

const handler = async (req: NextApiRequest, res: NextApiResponse<ResponseBody>) => {
  const type = Array.isArray(req.query.type) ? req.query.type[0] : req.query.type ?? '';
  const value = Array.isArray(req.query.value) ? req.query.value[0] : req.query.value ?? '';

  const castType = type as FrequencyFilterType;
  const isFilterValid = value && FREQUENCY_FILTER_TYPES.includes(castType);

  const frequency = isFilterValid ? await getFilterAAFrequency(castType, value) : await getTotalAAFrequency();

  const response = new ResponseBuilder()
    .withStatusCode(HttpStatus.OK)
    .withData(frequency);

  res.status(response.statusCode).send(response.build());
};

export default handler;
