import React from 'react';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { Heading } from 'react-bulma-components';
import { useRouter } from 'next/router';
import { PageMetadata } from '@components/common/pageMetadata';
import { PageWrapper } from '@components/common/pageWrapper';
import { PeptideSearchResult } from '@components/search/peptideSearchResult';
import { searchPeptidesTextQueryPaginated, searchPeptidesRegexQueryPaginated } from '@lib/services/graphDb/peptideService';
import { SearchResultPeptide } from '@lib/models/peptide';
import { convertFilterToParam, parseParamToFilter, TextQueryFilter } from '@lib/models/search';
import { Pagination } from '@lib/utils/pagination';
import { DYNAMIC_ROUTES } from '@lib/constants/routes';

interface ServerSideProps {
  query: string
  regexEnabled: boolean
  page: number

  peptides: SearchResultPeptide[]
  pagination: Pagination
  filters: TextQueryFilter[]
}

interface Props extends ServerSideProps {

}

const TextQuerySearchPage: React.FC<Props> = ({ page, regexEnabled, query, peptides, pagination, filters }) => {
  const router = useRouter();

  const pageTitle = query ?
    `${query} - Text Query` :
    'Text Query';

  const title = query ?
    `Found ${pagination.total} results for ${query} (Page: ${page})` :
    `Found ${pagination.total} results (Page: ${page})`;

  const handlePageChange = (newPage: number) => {
    return router.push(DYNAMIC_ROUTES.textQuery(query, regexEnabled, filters.map(convertFilterToParam), newPage));
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
  const { query: queryParam, regex: regexParam, page: pageParam, f: filterParam } = context.query ?? {};

  const query = queryParam ? (Array.isArray(queryParam) ? queryParam[0] : queryParam) : '';
  const regexEnabled = regexParam === 'true';
  const pageString = Array.isArray(pageParam) ? pageParam[0] : pageParam;
  const page = pageString ? parseInt(pageString, 10) : 1;

  const filters: (TextQueryFilter | null)[] = filterParam ?
    (Array.isArray(filterParam) ? filterParam.map(parseParamToFilter) : [parseParamToFilter(filterParam)]) :
    [];
  if (filters.some((filter) => !filter)) {
    return {
      notFound: true
    };
  }
  const castFilters = filters as TextQueryFilter[];

  try {
    const paginatedResult = regexEnabled ?
      await searchPeptidesRegexQueryPaginated(query, page, castFilters) :
      await searchPeptidesTextQueryPaginated(query, page, castFilters);

    return {
      props: {
        query,
        regexEnabled,
        page,

        peptides: paginatedResult.data,
        pagination: paginatedResult.pagination,
        filters: castFilters
      }
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true
    };
  }
};

export default TextQuerySearchPage;
