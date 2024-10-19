export const API_URL = process.env.API_URL!;
export const BIO_API_URL = process.env.BIO_API_URL!;

export const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL!;
export const NEXT_PUBLIC_DOWNLOADS_URL = process.env.NEXT_PUBLIC_DOWNLOADS_URL!;
export const LOCAL_DOWNLOADS_URL = process.env.LOCAL_DOWNLOADS_URL!;

export const NEXT_REVALIDATE_TIME = process.env.NEXT_REVALIDATE_TIME ? parseInt(process.env.NEXT_REVALIDATE_TIME, 10) : 3600;

export const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN!;
export const NEXT_PUBLIC_STRAPI_PROTO = process.env.NEXT_PUBLIC_STRAPI_PROTO!;
export const NEXT_PUBLIC_STRAPI_HOST = process.env.NEXT_PUBLIC_STRAPI_HOST!;
export const NEXT_PUBLIC_STRAPI_PORT = process.env.NEXT_PUBLIC_STRAPI_PORT ?? '';

export const NEXT_PUBLIC_STRAPI_URL = `${NEXT_PUBLIC_STRAPI_PROTO}://${NEXT_PUBLIC_STRAPI_HOST}${NEXT_PUBLIC_STRAPI_PORT ? `:${NEXT_PUBLIC_STRAPI_PORT}` : ''}`;
