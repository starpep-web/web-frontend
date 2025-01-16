import React from 'react';
import { notFound } from 'next/navigation';
import { createPageMetadata } from '@lib/next/metadata';
import { ExportPayloadType, isExportPayloadTypeValid } from '@lib/services/bioApi/models/export';
import { RouteDefs } from '@lib/constants/routes';
import { getTextQueryExport, getSingleQueryExport, getMultiQueryExport } from '@lib/services/bioApi/endpoints/export';
import { safeAsync } from '@lib/utils/async';
import { SearchExportLoadingNoProgress, SearchExportLoadingWithProgress } from '@components/searchExport/searchExportLoading';
import { SearchExportError } from '@components/searchExport/searchExportError';
import { SearchExportComplete } from '@components/searchExport/searchExportComplete';
import { PageContainer } from '@components/common/pageContainer';

const getSearchExportResult = (type: ExportPayloadType, taskId: string) => {
  switch (type) {
    case 'text':
      return getTextQueryExport(taskId);
    case 'single':
      return getSingleQueryExport(taskId);
    case 'multi':
      return getMultiQueryExport(taskId);
    default:
      throw new Error(`Invalid type ${type} provided.`);
  }
};

interface Params {
  params: {
    type: ExportPayloadType | string;
    id: string;
  }
}

export const generateMetadata = async ({ params } : Params) => {
  const result = isExportPayloadTypeValid(params.type) ? await getSearchExportResult(params.type, params.id) : null;

  let pageTitle = 'Export Search';
  if (result) {
    if (result.loading) {
      pageTitle = 'Loading... - Export Search';
    } else if (!result.success) {
      pageTitle = 'Error - Export Search';
    } else {
      pageTitle = `Export Search - ${params.id}`;
    }
  }

  return createPageMetadata(RouteDefs.searchExport(params.type as ExportPayloadType, params.id), {
    pageTitle
  });
};

interface Props extends Params {

}

const ExportPage = async ({ params }: Props) => {
  const { type, id } = params;

  if (!isExportPayloadTypeValid(type)) {
    return notFound();
  }

  const result = await safeAsync(null, async () => {
    return getSearchExportResult(type, id);
  });

  if (!result) {
    return notFound();
  }

  if (result.loading) {
    if (result.data) {
      return (
        <PageContainer main>
          <SearchExportLoadingWithProgress done={result.data.done} form={result.data.form} />
        </PageContainer>
      );
    }

    return (
      <PageContainer main>
        <SearchExportLoadingNoProgress style={{ marginTop: '30svh', marginBottom: '30svh' }} />
      </PageContainer>
    );
  }

  if (!result.success) {
    return (
      <PageContainer main>
        <SearchExportError error={result.data} />
      </PageContainer>
    );
  }

  return (
    <PageContainer main>
      <SearchExportComplete
        id={result.id}
        form={result.data.form}
        peptideIds={result.data.peptideIds}
        total={result.data.total}
      />
    </PageContainer>
  );
};

export default ExportPage;
