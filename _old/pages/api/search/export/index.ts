import { NextApiRequest, NextApiResponse } from 'next';
import HttpStatus from 'http-status-codes';
import { ResponseBuilder, ResponseBody } from '@lib/utils/http';
import { BadRequestError } from '@lib/errors/http';
import { createHandler } from '@lib/utils/api';
import { ExportRequestPayload, isSearchTypeValid } from '@lib/models/export';
import { postSearchExport } from '@lib/services/pythonRestApi/exportService';

const postHandler = async (req: NextApiRequest, res: NextApiResponse<ResponseBody>) => {
  const payload = req.body as ExportRequestPayload | undefined;

  if (!isSearchTypeValid(payload?.type)) {
    throw new BadRequestError('Invalid payload type provided.');
  }

  const exportTask = await postSearchExport(payload!);

  const response = new ResponseBuilder()
    .withStatusCode(HttpStatus.OK)
    .withData(exportTask);

  res.status(response.statusCode).send(response.build());
};

export default createHandler({
  POST: postHandler
});
