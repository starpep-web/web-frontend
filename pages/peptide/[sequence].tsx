import React from 'react';
import type { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { PageMetadata } from '@components/common/pageMetadata';
import { PageWrapper } from '@components/common/pageWrapper';
import { getPeptideBySequence } from '@lib/services/graphDb/peptideService';
import { FullPeptide } from '@lib/models/peptide';

interface ServerSideProps {
  peptide: FullPeptide
}

interface Props extends ServerSideProps {

}

const PeptidePage: React.FC<Props> = ({ peptide }) => {
  return (
    <PageWrapper>
      <PageMetadata title={peptide.sequence} />

      Peptide Page for {peptide.sequence}

      <pre>
        {JSON.stringify(peptide, null, 2)}
      </pre>
    </PageWrapper>
  );
};

export const getServerSideProps = async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<ServerSideProps>> => {
  const sequence = context.params!.sequence as string;
  const peptide = await getPeptideBySequence(sequence);

  if (!peptide) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      peptide
    }
  };
};

export default PeptidePage;
