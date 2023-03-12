import React from 'react';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { Heading } from 'react-bulma-components';
import { useRouter } from 'next/router';
import { PageMetadata } from '@components/common/pageMetadata';
import { PageWrapper } from '@components/common/pageWrapper';
import { PeptideSearchResult } from '@components/search/peptideSearchResult';
import { searchPeptidesTextQueryPaginated } from '@lib/services/graphDb/peptideService';
import { Peptide, TextQueryMetadataFilters } from '@lib/models/peptide';
import { Pagination } from '@lib/utils/pagination';
import { DYNAMIC_ROUTES } from '@lib/constants/routes';

interface ServerSideProps {
  query: string
  page: number

  peptides: Peptide[]
  pagination: Pagination
  metadataFilters: TextQueryMetadataFilters
}

interface Props extends ServerSideProps {

}

const TextQuerySearchPage: React.FC<Props> = ({ page, query, peptides, pagination, metadataFilters }) => {
  const router = useRouter();

  const pageTitle = query ?
    `${query} - Text Query` :
    'Text Query';

  const title = query ?
    `Found ${pagination.total} results for ${query} (Page: ${page})` :
    `Found ${pagination.total} results (Page: ${page})`;

  const handlePageChange = (newPage: number) => {
    return router.push(DYNAMIC_ROUTES.textQuery(query, metadataFilters, newPage));
  };

  return (
    <PageWrapper>
      <PageMetadata title={pageTitle} />

      <Heading>
        {title}
      </Heading>

      <PeptideSearchResult peptides={peptides} {...pagination} onPageChange={handlePageChange} />
    </PageWrapper>
  );
};

export const getServerSideProps = async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<ServerSideProps>> => {
  const { query: queryParam, page: pageParam, ...metadataFiltersParams } = context.query ?? {};

  const query = queryParam ? (Array.isArray(queryParam) ? queryParam[0] : queryParam).toUpperCase() : '';
  const pageString = Array.isArray(pageParam) ? pageParam[0] : pageParam;
  const page = pageString ? parseInt(pageString, 10) : 1;

  const metadataFilters: TextQueryMetadataFilters = Object.fromEntries(Object.entries(metadataFiltersParams).map(([nodeLabel, value]) => {
    return [nodeLabel, Array.isArray(value) ? value[0] : value];
  }));

  try {
    const paginatedResult = await searchPeptidesTextQueryPaginated(query, page);

    return {
      props: {
        query,
        page,

        peptides: paginatedResult.data,
        pagination: paginatedResult.pagination,
        metadataFilters
      }
    };
  } catch (error) {
    return {
      notFound: true
    };
  }
};

export default TextQuerySearchPage;
