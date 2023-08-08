import React from 'react';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { Heading } from 'react-bulma-components';
import { useRouter } from 'next/router';
import { PageMetadata } from '@components/common/pageMetadata';
import { PageWrapper } from '@components/common/pageWrapper';
import { PeptideSearchResult } from '@components/search/peptideSearchResult';
import { searchPeptidesTextQueryPaginated, searchPeptidesRegexQueryPaginated } from '@lib/services/graphDb/peptideService';
import { SearchResultPeptide } from '@lib/models/peptide';
import {
  TextQueryMetadataFilter,
  convertMetadataFilterToParam,
  parseParamToMetadataFilter,
  TextQueryAttributeFilter,
  convertAttributeFilterToParam,
  parseParamToAttributeFilter,
  FiltersObject
} from '@lib/models/search';
import { Pagination } from '@lib/utils/pagination';
import { DYNAMIC_ROUTES } from '@lib/constants/routes';

interface ServerSideProps {
  query: string
  regexEnabled: boolean
  page: number

  peptides: SearchResultPeptide[]
  pagination: Pagination
  filters: FiltersObject
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
    return router.push(DYNAMIC_ROUTES.textQuery(query, regexEnabled, {
      metadata: filters.metadata?.map(convertMetadataFilterToParam) ?? [],
      attributes: filters.attributes?.map(convertAttributeFilterToParam) ?? []
    }, newPage));
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
  const {
    query: queryParam,
    regex: regexParam,
    page: pageParam,
    fm: metadataFiltersParam,
    fa: attributeFiltersParam
  } = context.query ?? {};

  const query = queryParam ? (Array.isArray(queryParam) ? queryParam[0] : queryParam) : '';
  const regexEnabled = regexParam === 'true';
  const pageString = Array.isArray(pageParam) ? pageParam[0] : pageParam;
  const page = pageString ? parseInt(pageString, 10) : 1;

  const metadataFilters: (TextQueryMetadataFilter | null)[] = metadataFiltersParam ?
    (Array.isArray(metadataFiltersParam) ? metadataFiltersParam.map(parseParamToMetadataFilter) : [parseParamToMetadataFilter(metadataFiltersParam)]) :
    [];
  const attributeFilters: (TextQueryAttributeFilter | null)[] = attributeFiltersParam ?
    (Array.isArray(attributeFiltersParam) ? attributeFiltersParam.map(parseParamToAttributeFilter) : [parseParamToAttributeFilter(attributeFiltersParam)]) :
    [];

  if (
    metadataFilters.some((filter) => !filter) ||
    attributeFilters.some((filter) => !filter)
  ) {
    return {
      notFound: true
    };
  }

  const filters: FiltersObject = {
    metadata: metadataFilters as TextQueryMetadataFilter[],
    attributes: attributeFilters as TextQueryAttributeFilter[]
  };

  try {
    const paginatedResult = regexEnabled ?
      await searchPeptidesRegexQueryPaginated(query, page, filters) :
      await searchPeptidesTextQueryPaginated(query, page, filters);

    return {
      props: {
        query,
        regexEnabled,
        page,

        peptides: paginatedResult.data,
        pagination: paginatedResult.pagination,
        filters
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
