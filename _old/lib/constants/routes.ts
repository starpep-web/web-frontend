import { SearchType } from '@lib/models/export';

export const DYNAMIC_ROUTES = {
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
