import React from 'react';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { PageMetadata } from '@components/common/pageMetadata';
import { PageWrapper } from '@components/common/pageWrapper';
import { PeptideTitle } from '@components/peptide/peptideTitle';
import { PeptideGraph } from '@components/graphs/peptideGraph';
import { PeptideViewer } from '@components/pdb/peptideViewer';
import { PeptideInfo } from '@components/peptide/peptideInfo';
import { PeptideDownloads } from '@components/peptide/peptideDownloads';
import { PeptideMetadata } from '@components/peptide/peptideMetadata';
import { getPeptideBySequence } from '@lib/services/graphDb/peptideService';
import { FullPeptide } from '@lib/models/peptide';
import { getPeptidePdbContent } from '@lib/services/downloadServer/peptide';

interface ServerSideProps {
  peptide: FullPeptide
  pdbString: string
}

interface Props extends ServerSideProps {

}

const PeptidePage: React.FC<Props> = ({ peptide, pdbString }) => {
  return (
    <PageWrapper>
      <PageMetadata title={peptide.sequence} />

      <PeptideViewer pdb={pdbString} width="100%" height="100vh" />

      <PeptideTitle sequence={peptide.sequence} />
      <PeptideGraph peptide={peptide} width="100%" height="100vh" />

      <PeptideInfo {...peptide} />
      <PeptideDownloads id={peptide.id} />
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

  const pdbString = await getPeptidePdbContent(peptide.id);

  return {
    props: {
      peptide,
      pdbString
    }
  };
};

export default PeptidePage;
