import React from 'react';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { PageMetadata } from '@components/common/pageMetadata';
import { PageWrapper } from '@components/common/pageWrapper';
import { SearchType, isSearchTypeValid } from '@lib/models/export';

interface ServerSideProps {
  type: SearchType
  taskId: string
}

interface Props extends ServerSideProps {

}

const SearchExportPage: React.FC<Props> = ({ type, taskId }) => {
  return (
    <PageWrapper>
      <PageMetadata title={`Export Search | ${taskId}`} />

      <hr />
      <div>
        {type} - {taskId}
      </div>
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

  return {
    props: {
      type,
      taskId
    }
  };
};

export default SearchExportPage;
