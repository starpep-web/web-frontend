import { SingleQueryMetadataFilters } from '@lib/models/peptide';

export const ROUTES = {
  home: '/',
  about: '/about',
  contact: '/contact',
  faq: '/faq',
  help: '/help',
  search: '/search',
  statistics: '/statistics',
  tools: '/tools'
};

export const DYNAMIC_ROUTES = {
  peptide: (sequence: string) => `/peptide/${sequence}`,
  singleQuery: (query: string, metadataFilters: SingleQueryMetadataFilters = {}, page: number = 1) => {
    const params = new URLSearchParams({ query, ...metadataFilters, page: page.toString() });
    return `/search/single-query?${params.toString()}`;
  }
};
