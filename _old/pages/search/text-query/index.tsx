import React from 'react';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { useRouter } from 'next/router';
import { PageMetadata } from '@components/common/pageMetadata';
import { PageWrapper } from '@components/common/pageWrapper';
import { PeptideSearchHeading } from 'src/components/search/peptideSearchHeading';
import { TextQueryPeptideResultTable } from '@components/search/peptideSearchResult';
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
  return (
    <PageWrapper>
      <PeptideSearchHeading
        peptideTotalCount={pagination.total}
        searchType="text"
        exportPayloadData={exportPayloadData}
      />
    </PageWrapper>
  );
};
