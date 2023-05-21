import React from 'react';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { PageMetadata } from '@components/common/pageMetadata';
import { PageWrapper } from '@components/common/pageWrapper';
import { PeptideTitle } from '@components/peptide/peptideTitle';
import { PeptideVisualization } from '@components/peptide/peptideVisualization';
import { PeptideInfo } from '@components/peptide/peptideInfo';
import { PeptideDownloads } from '@components/peptide/peptideDownloads';
import { PeptideMetadata } from '@components/peptide/peptideMetadata';
import { getPeptideBySequence } from '@lib/services/graphDb/peptideService';
import { FullPeptide } from '@lib/models/peptide';
import { getPeptidePdbContentFromServer, getPublicPeptidePdbPreviewImageUrl } from '@lib/services/downloadServer/peptide';

interface ServerSideProps {
  peptide: FullPeptide
  pdbString: string
}

interface Props extends ServerSideProps {

}

const PeptidePage: React.FC<Props> = ({ peptide, pdbString }) => {
  return (
    <PageWrapper>
      <PageMetadata
        title={peptide.sequence}
        image={getPublicPeptidePdbPreviewImageUrl(peptide.id)}
        imageAlt="Visualization of Peptide 3D Structure"
      />

      <PeptideTitle sequence={peptide.sequence} />
      <PeptideVisualization peptide={peptide} pdbString={pdbString} />

      <PeptideInfo {...peptide} />
      <PeptideMetadata metadata={peptide.metadata} />
      <PeptideDownloads id={peptide.id} />
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

  const pdbString = await getPeptidePdbContentFromServer(peptide.id);

  return {
    props: {
      peptide,
      pdbString
    }
  };
};

export default PeptidePage;
