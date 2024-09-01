import { DEFAULT_FILTERS_PARAMS, FiltersParams } from '@lib/services/api/models/search';

export const RouteDefs = {
  home: '/',
  about: '/#about',
  contact: '/#contact',
  faq: '/faq',
  search: '/search',
  statistics: '/statistics',
  statisticsGeneralInformation: '/statistics/general-information',
  statisticsMetadata: '/statistics/metadata',
  statisticsFeatures: '/statistics/features',
  downloads: '/downloads',
  peptide: (id: string) => `/peptide/${id}`,
  textQuery: (query: string, regexEnabled: boolean, filtersParam: FiltersParams = DEFAULT_FILTERS_PARAMS, page: number = 1) => {
    const params = new URLSearchParams({
      query,
      page: page.toString(),
      regex: regexEnabled ? 'true' : 'false'
    });
    filtersParam.metadata.forEach((filter) => {
      params.append('fm', filter);
    });
    filtersParam.attributes.forEach((filter) => {
      params.append('fa', filter);
    });

    if (filtersParam.length) {
      params.append('l', filtersParam.length);
    }

    return `/search/text-query?${params.toString()}`;
  }
};
