import { NextRequest } from 'next/server';
import { NEXT_INTERNAL_AUTH_SECRET } from '@lib/config/app';

export const isInternalApiRequestAuthenticated = (req: NextRequest) => {
  const token = req.headers.get('X-Auth-Secret');
  return token === NEXT_INTERNAL_AUTH_SECRET;
};
