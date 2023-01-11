import React from 'react';
import type { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { PageMetadata } from '@components/common/pageMetadata';
import { PageWrapper } from '@components/common/pageWrapper';
import { getPeptideBySeq } from '@lib/services/graphDb/peptideService';
import { FullPeptide } from '@lib/models/peptide';

interface ServerSideProps {
  sequence: string
  peptide: FullPeptide
}

interface Props extends ServerSideProps {

}

const PeptidePage: React.FC<Props> = ({ sequence, peptide }) => {
  return (
    <PageWrapper>
      <PageMetadata title={sequence} />

      Peptide Page for {sequence}

      <pre>
        {JSON.stringify(peptide, null, 2)}
      </pre>
    </PageWrapper>
  );
};

export const getServerSideProps = async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<ServerSideProps>> => {
  const seq = context.params!.seq as string;
  const peptide = await getPeptideBySeq(seq);

  if (!peptide) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      sequence: seq,
      peptide: peptide
    }
  };
};

export default PeptidePage;
