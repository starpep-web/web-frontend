import React, { Fragment } from 'react';
import { SearchParam } from '@lib/next/types';
import { createPageMetadata } from '@lib/next/metadata';
import { getBooleanSearchParam, getNumberSearchParam, getStringArraySearchParam, getStringSearchParam } from '@lib/next/searchParams';
import { postRegexQuery, postRegexQueryExportPayload, postTextQuery, postTextQueryExportPayload } from '@lib/services/api/endpoints/search';
import { safeAsync } from '@lib/utils/async';
import { PeptideSearchHeading } from 'src/components/search/peptideSearchHeading';
import { TextQueryPeptideResultTable } from '@components/search/peptideSearchResult';
import { Pagination } from 'src/components/common/pagination';
import { RouteDefs } from '@lib/constants/routes';

interface Params {
  searchParams: {
    query?: SearchParam
    regex?: SearchParam
    page?: SearchParam
    fm?: SearchParam
    fa?: SearchParam
    l?: SearchParam
  }
}

export const generateMetadata = ({ searchParams } : Params) => {
  const query = getStringSearchParam(searchParams.query, '');
  const regex = getBooleanSearchParam(searchParams.regex, true);

  const pageTitle = query ? `${query} - Text Query` : 'Text Query';

  return createPageMetadata(RouteDefs.textQuery(query, regex), {
    pageTitle
  });
};

interface Props extends Params {

}

const TextQuerySearchPage: React.FC<Props> = async ({ searchParams }) => {
  const query = getStringSearchParam(searchParams.query, '');
  const regex = getBooleanSearchParam(searchParams.regex, true);
  const page = getNumberSearchParam(searchParams.page, 1);
  const filters = {
    metadata: getStringArraySearchParam(searchParams.fm),
    attributes: getStringArraySearchParam(searchParams.fa),
    length: getStringSearchParam(searchParams.l)
  };

  const results = await safeAsync(null, async () => {
    return regex ?
      await postRegexQuery(query, filters, page) :
      await postTextQuery(query, filters, page);
  });
  const exportData = await safeAsync(null, async () => {
    return regex ?
      await postRegexQueryExportPayload(query, filters) :
      await postTextQueryExportPayload(query, filters);
  });

  if (!results || !exportData) {
    return (
      <TextQueryPeptideResultTable peptides={[]} firstIndex={0} />
    );
  }

  const { data, pagination } = results;
  const title = query ?
    `Found ${pagination.total} results for ${query} (Page: ${page})` :
    `Found ${pagination.total} results (Page: ${page})`;

  const paginatedUrlBuilder = (page: number) => {
    return RouteDefs.textQuery(query, regex, filters, page);
  };

  return (
    <Fragment>
      <PeptideSearchHeading title={title} totalCount={pagination.total} type="text" data={exportData} />

      <TextQueryPeptideResultTable peptides={data} firstIndex={pagination.currentIndex} />
      <Pagination paginatedUrlBuilder={paginatedUrlBuilder} {...pagination} />
    </Fragment>
  );
};

export default TextQuerySearchPage;
