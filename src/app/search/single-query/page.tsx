import React from 'react';
import { notFound } from 'next/navigation';
import { SearchParam } from '@lib/next/types';
import { createPageMetadata } from '@lib/next/metadata';
import { getNumberSearchParam, getStringSearchParam } from '@lib/next/searchParams';
import { getSingleQuerySearch } from '@lib/services/bioApi/endpoints/search';
import { safeAsync } from '@lib/utils/async';
import { RefreshLoader } from 'src/components/common/refreshLoader';
import { ErrorMessage } from '@components/common/errorMessage';
import { PeptideSearchHeading } from '@components/search/peptideSearchHeading';
import { SingleQueryPeptideResultTable } from '@components/search/peptideSearchResult/singleQuery/SingleQueryPeptideResultTable';
import { Pagination } from '@components/common/pagination';
import { RouteDefs } from '@lib/constants/routes';
import { DEFAULT_AUTO_RELOAD_INTERVAL_SECONDS } from '@lib/constants/app';
import { PageContainer } from '@components/common/pageContainer';

interface Params {
  searchParams: {
    query?: SearchParam
    page?: SearchParam
  }
}

export const generateMetadata = async ({ searchParams }: Params) => {
  const queryId = getStringSearchParam(searchParams.query, '');
  const result = queryId ? await getSingleQuerySearch(queryId) : null;

  let pageTitle = 'Single Query Alignment Search';
  if (result) {
    if (result.loading) {
      pageTitle = 'Loading... - Single Query Alignment Search';
    } else if (!result.success) {
      pageTitle = 'Error - Single Query Alignment Search';
    } else {
      pageTitle = `Single Query Alignment Search - ${queryId}`;
    }
  }

  return createPageMetadata(RouteDefs.singleQuery(queryId), {
    pageTitle
  });
};

interface Props extends Params {

}

const SingleQuerySearchPage = async ({ searchParams }: Props) => {
  const queryId = getStringSearchParam(searchParams.query, '');
  const page = getNumberSearchParam(searchParams.page, 1);

  const result = await safeAsync(null, async () => {
    return queryId ? await getSingleQuerySearch(queryId, page) : null;
  });

  if (!result) {
    return notFound();
  }

  if (result.loading) {
    return (
      <PageContainer main>
        <RefreshLoader
          style={{ marginTop: '30svh', marginBottom: '30svh' }}
          title="Aligning your query..."
          subtitle="The page will automatically refresh until the alignment is done."
          refreshInterval={DEFAULT_AUTO_RELOAD_INTERVAL_SECONDS}
        />
      </PageContainer>
    );
  }

  if (!result.success) {
    return (
      <PageContainer main>
        <ErrorMessage
          show
          error={`Server responded with: ${result.data}`}
          header="Could not get your single query alignment"
          description="Try re-running your single query search."
        />
      </PageContainer>
    );
  }

  const { data: peptides, pagination } = result.data;
  const paginatedUrlBuilder = (page: number) => {
    return RouteDefs.singleQuery(queryId, page);
  };

  return (
    <PageContainer main>
      <PeptideSearchHeading
        title={`Found ${pagination.total} results (Page: ${page})`}
        totalCount={pagination.total}
        type="single"
        data={queryId}
      />

      <SingleQueryPeptideResultTable peptides={peptides} firstIndex={pagination.currentIndex} />
      <Pagination paginatedUrlBuilder={paginatedUrlBuilder} {...pagination} />
    </PageContainer>
  );
};

export default SingleQuerySearchPage;
