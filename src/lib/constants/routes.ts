import { DEFAULT_FILTERS_PARAMS, TextQueryFilterParams } from '@lib/services/api/models/search';
import { ExportPayloadType } from '@lib/services/bioApi/models/export';

export const RouteDefs = {
  home: '/',
  about: '/#about',
  contact: '/#contact',
  publications: '/publications',
  search: '/search',
  statistics: '/statistics',
  statisticsGeneralInformation: '/statistics/general-information',
  statisticsMetadata: '/statistics/metadata',
  statisticsFeatures: '/statistics/features',
  downloads: '/downloads',
  peptide: (id: string) => `/peptide/${id}`,
  textQuery: (query: string, regexEnabled: boolean, filtersParam: TextQueryFilterParams = DEFAULT_FILTERS_PARAMS, page: number = 1) => {
    const params = new URLSearchParams({
      query,
      page: page.toString(),
      regex: regexEnabled ? 'true' : 'false'
    });

    if (filtersParam.metadata) {
      filtersParam.metadata.forEach((filter) => {
        params.append('fm', filter);
      });
    }
    if (filtersParam.attributes) {
      filtersParam.attributes.forEach((filter) => {
        params.append('fa', filter);
      });
    }
    if (filtersParam.length) {
      params.append('l', filtersParam.length);
    }

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
  },
  searchExport: (type: ExportPayloadType, taskId: string) => {
    return `/search/export/${type}/${taskId}`;
  }
};
