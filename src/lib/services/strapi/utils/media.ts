import { NEXT_PUBLIC_STRAPI_URL } from '@lib/config/app';

export const getStrapiMedia = (url?: string): string | null => {
  if (!url) {
    return null;
  }

  if (url.startsWith('http')) {
    return url;
  }

  return `${NEXT_PUBLIC_STRAPI_URL}${url}`;
};
