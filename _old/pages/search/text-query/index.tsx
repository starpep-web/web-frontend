import React from 'react';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { useRouter } from 'next/router';
import { PageMetadata } from '@components/common/pageMetadata';
import { PageWrapper } from '@components/common/pageWrapper';
import { PeptideSearchResultHeading } from '@components/search/peptideSearchResultHeading';
import { PeptideSearchResult } from '@components/search/peptideSearchResult';
import {
  searchExportablePeptidesTextQueryPaginated,
  searchExportablePeptidesRegexQueryPaginated
} from '@lib/services/graphDb/peptideService';
import { SearchResultPeptide } from '@lib/models/peptide';
import {
  TextQueryMetadataFilter,
  convertMetadataFilterToParam,
  parseParamToMetadataFilter,
  TextQueryAttributeFilter,
  convertAttributeFilterToParam,
  parseParamToAttributeFilter,
  SequenceLengthFilter,
  convertSequenceLengthFilterToParam,
  parseParamToSequenceLengthFilter,
  FiltersObject
} from '@lib/models/search';
import { Pagination } from '@lib/utils/pagination';
import { ExportPayloadData } from '@lib/models/export';
import { DYNAMIC_ROUTES } from '@lib/constants/routes';

interface ServerSideProps {
  query: string
  regexEnabled: boolean
  page: number

  peptides: SearchResultPeptide[]
  pagination: Pagination
  filters: FiltersObject
  exportPayloadData: ExportPayloadData
}

interface Props extends ServerSideProps {

}

const TextQuerySearchPage: React.FC<Props> = ({ page, regexEnabled, query, peptides, pagination, filters, exportPayloadData }) => {
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
      attributes: filters.attributes?.map(convertAttributeFilterToParam) ?? [],
      length: filters.length ? convertSequenceLengthFilterToParam(filters.length) : ''
    }, newPage));
  };

  return (
    <PageWrapper>
      <PageMetadata title={pageTitle} />

      <PeptideSearchResultHeading
        title={title}
        peptideTotalCount={pagination.total}
        searchType="text"
        exportPayloadData={exportPayloadData}
      />

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
    fa: attributeFiltersParam,
    l: sequenceLengthFilterParam
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
  const sequenceLengthFilter: (SequenceLengthFilter | null | false) = sequenceLengthFilterParam ?
    (Array.isArray(sequenceLengthFilterParam)) ? parseParamToSequenceLengthFilter(sequenceLengthFilterParam[0]) : parseParamToSequenceLengthFilter(sequenceLengthFilterParam) :
    false;

  if (
    metadataFilters.some((filter) => !filter) ||
    attributeFilters.some((filter) => !filter) ||
    sequenceLengthFilter === null
  ) {
    return {
      notFound: true
    };
  }

  const filters: FiltersObject = {
    metadata: metadataFilters as TextQueryMetadataFilter[],
    attributes: attributeFilters as TextQueryAttributeFilter[]
  };
  if (sequenceLengthFilter) {
    filters.length = sequenceLengthFilter;
  }

  try {
    const paginatedResult = regexEnabled ?
      await searchExportablePeptidesRegexQueryPaginated(query, page, filters) :
      await searchExportablePeptidesTextQueryPaginated(query, page, filters);

    return {
      props: {
        query,
        regexEnabled,
        page,

        peptides: paginatedResult.data,
        pagination: paginatedResult.pagination,
        exportPayloadData: paginatedResult.exportPayloadData,
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
