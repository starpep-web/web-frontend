export const ROUTES = {
  home: '/',
  about: '/#about',
  contact: '/#contact',
  faq: '/faq',
  search: '/search',
  statistics: '/statistics',
  statisticsGeneralInformation: '/statistics/general-information',
  statisticsMetadata: '/statistics/metadata',
  statisticsFeatures: '/statistics/features',
  downloads: '/downloads'
};

export const DYNAMIC_ROUTES = {
  peptide: (id: string) => `/peptide/${id}`,
  textQuery: (query: string, regexEnabled: boolean, filtersParam: string[] = [], page: number = 1) => {
    const params = new URLSearchParams({
      query,
      page: page.toString(),
      regex: regexEnabled ? 'true' : 'false'
    });
    filtersParam.forEach((filter) => {
      params.append('f', filter);
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
