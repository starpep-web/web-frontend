export const NODE_ENV = process.env.NODE_ENV as string;
export const BUILDING_STAGE = process.env.BUILDING_STAGE as string;

export const DATAMINING_API_URL = process.env.DATAMINING_API_URL as string;
export const NEO4J_DB_URI = process.env.NEO4J_DB_URI as string;

export const WEBSITE_URL = NODE_ENV === 'production' ? 'https://webpep.moonstar-x.dev' : 'http://localhost:3000';
