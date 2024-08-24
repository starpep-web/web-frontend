import React from 'react';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { PageMetadata } from '@components/common/pageMetadata';
import { PageWrapper } from '@components/common/pageWrapper';
import { PeptideTitle } from '@components/peptide/peptideTitle';
import { PeptideVisualization } from '@components/peptide/peptideVisualization';
import { PeptideInfo } from '@components/peptide/peptideInfo';
import { PeptideAttributes } from '@components/peptide/peptideAttributes';
import { PeptideDownloads } from '@components/peptide/peptideDownloads';
import { PeptideMetadata } from '@components/peptide/peptideMetadata';
import { getPeptideById } from '@lib/services/graphDb/peptideService';
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
      <PeptideAttributes attributes={peptide.attributes} />
      <PeptideMetadata metadata={peptide.metadata} />
      <PeptideDownloads id={peptide.id} />
    </PageWrapper>
  );
};

export default PeptidePage;
