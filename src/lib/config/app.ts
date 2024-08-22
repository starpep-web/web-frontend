export const API_URL = process.env.API_URL!;

export const PUBLIC_URL = process.env.PUBLIC_URL!;
export const PUBLIC_DOWNLOADS_URL = process.env.PUBLIC_DOWNLOADS_URL!;
export const LOCAL_DOWNLOADS_URL = process.env.LOCAL_DOWNLOADS_URL!;

export const NEXT_REVALIDATE_TIME = process.env.NEXT_REVALIDATE_TIME ? parseInt(process.env.NEXT_REVALIDATE_TIME, 10) : 3600;
