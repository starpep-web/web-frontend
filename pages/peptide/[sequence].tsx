import React from 'react';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { PageMetadata } from '@components/common/pageMetadata';
import { PageWrapper } from '@components/common/pageWrapper';
import { PeptideGraph } from '@components/graphs/peptideGraph';
import { PeptideTitle } from '@components/peptide/peptideTitle';
import { PeptideInfo } from '@components/peptide/peptideInfo';
import { PeptideMetadata } from '@components/peptide/peptideMetadata';
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

      <PeptideTitle sequence={peptide.sequence} />
      <PeptideGraph peptide={peptide} width="100%" />

      <PeptideInfo {...peptide} />
      <PeptideMetadata metadata={peptide.metadata} />
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
