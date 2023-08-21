import React from 'react';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { PageMetadata } from '@components/common/pageMetadata';
import { PageWrapper } from '@components/common/pageWrapper';
import { SearchExportLoadingNoProgress, SearchExportLoadingWithProgress } from '@components/searchExport/searchExportLoading';
import { SearchExportError } from '@components/searchExport/searchExportError';
import { SearchExportComplete } from '@components/searchExport/searchExportComplete';
import { isSearchTypeValid, ExportResult } from '@lib/models/export';
import { AsyncTaskResponse } from '@lib/services/pythonRestApi/apiService';
import { getSearchExportResult } from '@lib/services/pythonRestApi/exportService';

interface ServerSideProps {
  result: AsyncTaskResponse<ExportResult>
}

interface Props extends ServerSideProps {

}

const SearchExportPage: React.FC<Props> = ({ result }) => {
  if (result.loading) {
    return (
      <PageWrapper>
        <PageMetadata
          title={`Loading... - Export Search - ${result.id}`}
        />

        {
          result.data ? (
            <SearchExportLoadingWithProgress
              done={result.data.done}
              form={result.data.form}
              total={result.data.total}
            />
          ) : (
            <SearchExportLoadingNoProgress />
          )
        }
      </PageWrapper>
    );
  }

  if (!result.success) {
    return (
      <PageWrapper>
        <PageMetadata
          title={`Error - Export Search - ${result.id}`}
        />

        <SearchExportError error={result.data} />
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <PageMetadata
        title={`Export Search - ${result.id}`}
      />

      <SearchExportComplete
        id={result.id}
        form={result.data.form}
        peptideIds={result.data.peptideIds}
        total={result.data.total}
      />
    </PageWrapper>
  );
};

export const getServerSideProps = async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<ServerSideProps>> => {
  const type = context.params!.type as string;
  const taskId = context.params!.id as string;

  if (!isSearchTypeValid(type)) {
    return {
      notFound: true
    };
  }

  try {
    const result = await getSearchExportResult(type, taskId);
    if (!result.loading && !result.success) {
      console.error(result);
    }

    return {
      props: {
        result
      }
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true
    };
  }
};

export default SearchExportPage;
