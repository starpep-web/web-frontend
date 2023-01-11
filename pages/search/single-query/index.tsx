import React from 'react';
import type { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { Heading } from 'react-bulma-components';
import { PageMetadata } from '@components/common/pageMetadata';
import { PageWrapper } from '@components/common/pageWrapper';
import { ErrorBoundary } from '@components/common/errorBoundary';
import { PeptideSearchResult } from '@components/search/peptideSearchResult';
import { searchPeptidesSingleQuery } from '@lib/services/graphDb/peptideService';

interface ServerSideProps {
  queryError?: string
  query?: string
  page?: number
  peptides?: string[]
}

interface Props extends ServerSideProps {

}

const SingleQuerySearchPage: React.FC<Props> = ({ queryError, page, query, peptides }) => {
  return (
    <PageWrapper>
      <PageMetadata title="Single Query" />

      <ErrorBoundary header="Could not complete your search" error={queryError}>
        <Heading>
          Search results for {query} (Page: {page})
        </Heading>

        <PeptideSearchResult peptides={peptides!} />
      </ErrorBoundary>
    </PageWrapper>
  );
};

export const getServerSideProps = async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<ServerSideProps>> => {
  if (!context.query?.query) {
    return {
      props: {
        queryError: 'No query provided.'
      }
    };
  }

  const pageString = Array.isArray(context.query?.page) ? context.query.page[0] : context.query.page;
  const page = pageString ? parseInt(pageString, 10) : 1;

  if (Number.isNaN(page) || page < 1) {
    return {
      props: {
        queryError: 'Invalid page number provided.'
      }
    };
  }

  const query = Array.isArray(context.query.query) ? context.query.query[0] : context.query.query;
  const peptides = await searchPeptidesSingleQuery(query, 50, 0);

  return {
    props: {
      query,
      page,
      peptides
    }
  };
};

export default SingleQuerySearchPage;
