import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { NEXT_CACHE_TAG_STRAPI } from '@lib/constants/app';

export const POST = () => {
  revalidateTag(NEXT_CACHE_TAG_STRAPI);

  return NextResponse.json({
    revalidated: true,
    date: new Date().toISOString()
  }, { status: 200 });
};
