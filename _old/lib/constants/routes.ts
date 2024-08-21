import { DEFAULT_FILTERS_PARAMS, FiltersParams } from '@lib/models/search';
import { SearchType } from '@lib/models/export';

export const DYNAMIC_ROUTES = {
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
  searchExport: (type: SearchType, taskId: string) => {
    return `/search/export/${type}/${taskId}`;
  }
};
