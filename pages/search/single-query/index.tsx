import React from 'react';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { Heading } from 'react-bulma-components';
import { useRouter } from 'next/router';
import { PageMetadata } from '@components/common/pageMetadata';
import { PageWrapper } from '@components/common/pageWrapper';
import { PeptideSearchResult } from '@components/search/peptideSearchResult';
import { getSingleQuerySearch } from '@lib/services/pythonRestApi/searchService';
import { AsyncTaskResponse } from '@lib/services/pythonRestApi/apiService';
import { SingleAlignedPeptide } from '@lib/models/search';
import { WithPagination } from '@lib/utils/pagination';
import { DYNAMIC_ROUTES } from '@lib/constants/routes';

interface ServerSideProps {
  queryId: string
  page: number

  result: AsyncTaskResponse<WithPagination<SingleAlignedPeptide[]>>
}

interface Props extends ServerSideProps {

}

const SingleQuerySearchPage: React.FC<Props> = ({ queryId, page, result }) => {
  const router = useRouter();

  const handlePageChange = (newPage: number) => {
    return router.push(DYNAMIC_ROUTES.singleQuery(queryId, newPage));
  };

  if (result.loading) {
    return (
      <PageWrapper>
        <PageMetadata
          title="Loading... - Single Query Alignment Search"
        />
        LOADING...
      </PageWrapper>
    );
  }

  if (!result.success) {
    return (
      <PageWrapper>
        <PageMetadata
          title="Error - Single Query Alignment Search"
        />

        {result.data}
      </PageWrapper>
    );
  }

  const { data: peptides, pagination } = result.data;

  return (
    <PageWrapper>
      <PageMetadata
        title={`Single Query Alignment Search - ${queryId}`}
      />

      <Heading>
        {`Found ${pagination.total} results (Page: ${page})`}
      </Heading>

      <PeptideSearchResult peptides={peptides} {...pagination} onPageChange={handlePageChange} />
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
    const paginatedResult = await getSingleQuerySearch(queryId, page);

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

export default SingleQuerySearchPage;
