import React from 'react';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { useRouter } from 'next/router';
import { PageMetadata } from '@components/common/pageMetadata';
import { PageWrapper } from '@components/common/pageWrapper';
import { SearchLoader } from '@components/search/searchLoader';
import { ErrorMessage } from '@components/common/errorMessage';
import { PeptideSearchResultHeading } from '@components/search/peptideSearchResultHeading';
import { MultiAlignedPeptideSearchResult } from '@components/search/peptideSearchResult';
import { getMultiQuerySearch } from '@lib/services/pythonRestApi/searchService';
import { AsyncTaskResponse } from '@lib/services/pythonRestApi/apiService';
import { MultiAlignedPeptide } from '@lib/models/search';
import { WithPagination } from '@lib/utils/pagination';
import { DYNAMIC_ROUTES } from '@lib/constants/routes';
import { DEFAULT_AUTO_RELOAD_INTERVAL } from '@lib/constants/site';

interface ServerSideProps {
  queryId: string
  page: number

  result: AsyncTaskResponse<WithPagination<MultiAlignedPeptide[]>>
}

interface Props extends ServerSideProps {

}

const MultiQuerySearchPage: React.FC<Props> = ({ queryId, page, result }) => {
  const router = useRouter();

  const handlePageChange = (newPage: number) => {
    return router.push(DYNAMIC_ROUTES.multiQuery(queryId, newPage));
  };

  if (result.loading) {
    return (
      <PageWrapper>
        <PageMetadata
          title="Loading... - Multi Query Alignment Search"
        />

        <SearchLoader
          title="Aligning your query..."
          subtitle="The page will automatically refresh until the alignment is done."
          refreshInterval={DEFAULT_AUTO_RELOAD_INTERVAL}
        />
      </PageWrapper>
    );
  }

  if (!result.success) {
    return (
      <PageWrapper>
        <PageMetadata
          title="Error - Multi Query Alignment Search"
        />

        <ErrorMessage
          show
          error={`Server responded with: ${result.data}`}
          header="Could not get your multi query alignment"
          description="Try re-running your multi query search."
        />
      </PageWrapper>
    );
  }

  const { data: peptides, pagination } = result.data;

  return (
    <PageWrapper>
      <PageMetadata
        title={`Multi Query Alignment Search - ${queryId}`}
      />

      <PeptideSearchResultHeading
        title={`Found ${pagination.total} results (Page: ${page})`}
      />

      <MultiAlignedPeptideSearchResult peptides={peptides} {...pagination} onPageChange={handlePageChange} />
    </PageWrapper>
  );
};

export const getServerSideProps = async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<ServerSideProps>> => {
  const { query: queryParam, page: pageParam } = context.query ?? {};

  const queryId = queryParam ? (Array.isArray(queryParam) ? queryParam[0] : queryParam) : '';
  const pageString = Array.isArray(pageParam) ? pageParam[0] : pageParam;
  const page = pageString ? parseInt(pageString, 10) : 1;

  if (!queryId) {
    return {
      notFound: true
    };
  }

  try {
    const paginatedResult = await getMultiQuerySearch(queryId, page);

    return {
      props: {
        queryId,
        page,
        result: paginatedResult
      }
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true
    };
  }
};

export default MultiQuerySearchPage;
