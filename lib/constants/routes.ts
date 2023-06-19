/* eslint-disable max-params */
import { TextQueryMetadataFilters } from '@lib/models/peptide';

export const ROUTES = {
  home: '/',
  about: '/#about',
  contact: '/#contact',
  faq: '/faq',
  help: '/help',
  search: '/search',
  statistics: '/statistics',
  statisticsGeneralInformation: '/statistics/general-information',
  statisticsMetadata: '/statistics/metadata',
  statisticsFeatures: '/statistics/features',
  tools: '/tools',
  downloads: '/downloads'
};

export const DYNAMIC_ROUTES = {
  peptide: (id: string) => `/peptide/${id}`,
  textQuery: (query: string, regexEnabled: boolean, metadataFilters: Partial<TextQueryMetadataFilters> = {}, page: number = 1) => {
    const params = new URLSearchParams({
      query,
      ...metadataFilters,
      page: page.toString(),
      regex: regexEnabled ? 'true' : 'false'
    });
    return `/search/text-query?${params.toString()}`;
  },
  singleQuery: (queryId: string, page: number = 1) => {
    const params = new URLSearchParams({
      query: queryId,
      page: page.toString()
    });
    return `/search/single-query?${params.toString()}`;
  },
  multiQuery: (queryId: string, page: number = 1) => {
    const params = new URLSearchParams({
      query: queryId,
      page: page.toString()
    });
    return `/search/multi-query?${params.toString()}`;
  }
};
