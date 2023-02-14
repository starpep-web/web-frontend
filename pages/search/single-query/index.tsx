import React from 'react';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { Heading } from 'react-bulma-components';
import { useRouter } from 'next/router';
import { PageMetadata } from '@components/common/pageMetadata';
import { PageWrapper } from '@components/common/pageWrapper';
import { PeptideSearchResult } from '@components/search/peptideSearchResult';
import { searchPeptidesSingleQueryPaginated } from '@lib/services/graphDb/peptideService';
import { Peptide } from '@lib/models/peptide';
import { Pagination } from '@lib/utils/pagination';
import { DYNAMIC_ROUTES } from '@lib/constants/routes';

interface ServerSideProps {
  query: string
  page: number

  peptides: Peptide[]
  pagination: Pagination
}

interface Props extends ServerSideProps {

}

const SingleQuerySearchPage: React.FC<Props> = ({ page, query, peptides, pagination }) => {
  const router = useRouter();

  const title = query ?
    `Found ${pagination.total} results for ${query} (Page: ${page})` :
    `Found ${pagination.total} results (Page: ${page})`;

  const handlePageChange = (newPage: number) => {
    return router.push(DYNAMIC_ROUTES.singleQuery(query, newPage));
  };

  return (
    <PageWrapper>
      <PageMetadata title="Single Query" />

      <Heading>
        {title}
      </Heading>

      <PeptideSearchResult peptides={peptides} {...pagination} onPageChange={handlePageChange} />
    </PageWrapper>
  );
};

export const getServerSideProps = async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<ServerSideProps>> => {
  const query = context.query?.query ? (Array.isArray(context.query.query) ? context.query.query[0] : context.query.query).toUpperCase() : '';
  const pageString = Array.isArray(context.query?.page) ? context.query.page[0] : context.query.page;
  const page = pageString ? parseInt(pageString, 10) : 1;

  try {
    const paginatedResult = await searchPeptidesSingleQueryPaginated(query, page);

    return {
      props: {
        query,
        page,

        peptides: paginatedResult.data,
        pagination: paginatedResult.pagination
      }
    };
  } catch (error) {
    return {
      notFound: true
    };
  }
};

export default SingleQuerySearchPage;
